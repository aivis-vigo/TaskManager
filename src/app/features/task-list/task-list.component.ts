import {Component, OnDestroy, OnInit} from '@angular/core';
import {CreateTaskComponent} from "../create-task/create-task.component";
import {AsyncPipe} from "@angular/common";
import {Observable, Subject, takeUntil} from "rxjs";
import {TaskService} from "../../services/task.service";
import {TaskModel} from "../../shared/task.model";
import {JsonStructureModel} from "../../shared/json-structure.model";

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
  tasks$: Observable<TaskModel[]> = this.taskService.tasks$;
  destroy$: Subject<void> = new Subject<void>();

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.taskService.loadInitialTasks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: JsonStructureModel) => {
        const tasks = response.data.tasks;
        this.taskService.taskSubject.next(tasks);
      });
  }

  addTask(newTask: TaskModel): void {
    console.log(this.taskService.tasks$);
    this.taskService.addTask(newTask);
  }

  removeTask(taskId: number): void {
    this.taskService.removeTask(taskId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
