import {Component, OnDestroy} from '@angular/core';
import {CreateTaskComponent} from "../create-task/create-task.component";
import {AsyncPipe} from "@angular/common";
import {Subject, takeUntil} from "rxjs";
import {TaskService} from "../../services/task.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

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
  destroy: Subject<void> = new Subject<void>();

  constructor(protected taskService: TaskService, private router: Router) {
  }

  viewTask(taskId: string): void {
    this.router.navigate(['/task-list', taskId]);
  }

  removeTask(taskId: string): void {
    this.taskService.removeTask(taskId)
      .pipe(takeUntil(this.destroy))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
