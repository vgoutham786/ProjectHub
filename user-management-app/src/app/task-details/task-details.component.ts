import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TaskService } from '../task.service'; // Replace with the actual path
import { Task } from '../task.model';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  taskId: number | null = null;
  task: Task | null = null; // Define Task interface or class

  constructor(private route: ActivatedRoute, private taskService: TaskService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id !== null) {
        this.taskId = +id;
        // Fetch the task details by task ID
        this.taskService.getTaskById(this.taskId).subscribe((task) => {
          this.task = task;
        });
      } else {
        // Handle the case where 'id' is null, e.g., show an error message or redirect.
        alert("No task found")
      }
    });
  }
}
