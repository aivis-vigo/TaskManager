import {Component, OnDestroy} from '@angular/core';
import {CreateTaskComponent} from "../create-task/create-task.component";
import {AsyncPipe} from "@angular/common";
import {Subject} from "rxjs";
import {TaskService} from "../../services/task.service";
import {Router} from "@angular/router";

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
export class TaskListComponent implements OnDestroy {
  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(protected taskService: TaskService, private router: Router) {
  }

  removeTask(taskId: number): void {
    this.taskService.removeTask(taskId);
  }

  viewTask(taskId: number): void {
    this.router.navigate(['/task-list', taskId]);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
