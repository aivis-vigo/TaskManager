import {Component, OnDestroy} from '@angular/core';
import {CreateTaskComponent} from "../create-task/create-task.component";
import {AsyncPipe} from "@angular/common";
import {Observable, Subject, takeUntil} from "rxjs";
import {TaskService} from "../../services/task.service";
import {Router} from "@angular/router";
import {DeleteResponseModel} from "../../shared/delete-response.model";

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
  statusMessage: string = '';

  constructor(protected taskService: TaskService, private router: Router) {
  }

  removeTask(taskId: string): void {
    this.taskService.removeTask(taskId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res: DeleteResponseModel) => this.statusMessage = res.message);
  }

  viewTask(taskId: string): void {
    this.router.navigate(['/task-list', taskId]);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
