import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  isCreateTaskModalOpen = false;
  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    due_date: new Date(),
    priority: '',
    status: 'To Do',
  };
  editMode = false;
  selectedTask: Task | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  createTask() {
    this.taskService.createTask(this.newTask).subscribe(
      (response: Task) => {
        this.tasks.push(response);
        this.newTask = { id: 0, title: '', description: '', due_date: new Date(), priority: '', status: 'To Do' };
        alert("Task added successfully")
        this.closeCreateTaskModal();
      },
      (error) => {
        // Handle any errors that occur during task creation
        alert("Internal Error")
      }
    );
  }



  updateTask(taskId: number) {
    const updatedTask = this.tasks.find((task) => task.id === taskId);
    if (updatedTask) {
      this.taskService.updateTask(taskId, updatedTask).subscribe(
        (response: Task) => {
          this.selectedTask = null;
          this.editMode = false;
          alert("Updated")
        },
       
        (error) => {
          // Handle any errors that occur during task update
          alert("Internal Error")
        }
      );
    }
  }

  deleteTask(taskId: number) {
    const taskToDelete = this.tasks.find((task) => task.id === taskId);
    if (taskToDelete) {
      this.taskService.deleteTask(taskToDelete.id).subscribe(
        () => {
          this.tasks = this.tasks.filter((task) => task.id !== taskToDelete.id);
          alert("Deleted")
        },
        (error) => {
          // Handle any errors that occur during task deletion
          alert("Internal Error")
        }
      );
    }
  }

  viewTaskDetails(taskId: number) {
    // Implement task details view logic here
  }

  cancelEdit() {
    this.selectedTask = null;
    this.editMode = false;
  }
  closeCreateTaskModal() {
    this.isCreateTaskModalOpen = false;
  }
  selectTask(task: Task) {
    this.selectedTask = task;
    this.editMode = true;
  }
}
