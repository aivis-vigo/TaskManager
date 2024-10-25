import {Component, OnDestroy, OnInit} from '@angular/core';
import {CreateTaskComponent} from "../create-task/create-task.component";
import {AsyncPipe} from "@angular/common";
import {Subject, takeUntil} from "rxjs";
import {TaskService} from "../../services/task.service";
import {JsonStructureModel} from "../../shared/json-structure.model";
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
export class TaskListComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();

  constructor(protected taskService: TaskService, private router: Router) {
  }

  ngOnInit(): void {
    this.taskService
      .loadInitialTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: JsonStructureModel) => {
        const tasks = response.data.tasks;
        this.taskService.taskSubject.next(tasks);
      });
  }

  removeTask(taskId: number): void {
    this.taskService.removeTask(taskId);
  }

  viewTask(taskId: number): void {
    this.router.navigate(['/task-list', taskId]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
