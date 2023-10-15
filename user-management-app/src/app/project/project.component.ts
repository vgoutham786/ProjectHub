
import { Component, OnInit } from '@angular/core';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  projectFormData: Project = {
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    project_manager: 0,
  };
  editMode: 'create' | 'edit' = 'create';
  showEditModal = false;

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getAllProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  openEditModal(project: Project | null, mode: 'create' | 'edit') {
    this.editMode = mode;
    if (mode === 'edit') {
      this.projectFormData = { ...project! };
    } else {
      this.projectFormData = {
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        project_manager: 0,
      };
    }
    this.showEditModal = true;
  }

  onSubmit() {
    if (this.editMode === 'create') {
      // Handle project creation
      console.log('Project Form Data:', this.projectFormData);
      this.projectService.createProject(this.projectFormData).subscribe((newProject) => {
        this.projects.push(newProject);
        this.closeEditModal();
      });
    } else {
      // Handle project update
      this.projectService.updateProject(this.projectFormData).subscribe((updatedProject) => {
        const index = this.projects.findIndex((p) => p.id === updatedProject.id);
        if (index !== -1) {
          this.projects[index] = { ...updatedProject };
          this.closeEditModal();
        }
      });
    }
  }

  deleteProject(id: number | undefined) {
    if (id !== undefined) {
      this.projectService.deleteProject(id).subscribe(() => {
        this.projects = this.projects.filter((project) => project.id !== id);
      });
    }
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editMode = 'create';
  }
}
