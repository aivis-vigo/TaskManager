import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskModel} from "../../shared/task.model";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit {
  task: TaskModel = <TaskModel>{};
  errorMessage: string = '';

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    const fetchedTask = this.taskService.getTask(taskId);
    if (fetchedTask) {
      this.task = fetchedTask;
    } else {
      this.errorMessage = `Failed to fetch task with id: ${taskId}`;
    }
  }
}
