import {Component} from '@angular/core';
import {CreateTaskComponent} from "../create-task/create-task.component";
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";
import {TaskService} from "../../services/task.service";
import {TaskModel} from "../../shared/task.model";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CreateTaskComponent,
    AsyncPipe
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  tasks$: Observable<TaskModel[]> = this.taskService.tasks$;

  constructor(private taskService: TaskService) {
  }

  removeTask(taskId: number): void {
    this.taskService.removeTask(taskId);
  }
}
