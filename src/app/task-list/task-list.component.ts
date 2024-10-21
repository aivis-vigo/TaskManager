import {Component, OnInit} from '@angular/core';
import {CreateTaskComponent} from "../create-task/create-task.component";
import {Task} from "../task";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CreateTaskComponent,
    NgIf,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<Task[]>;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();
  }

  addTask(newTask: Task): void {
    this.taskService.addTask(newTask);
  }

  removeTask(taskId: number): void {
    this.taskService.removeTask(taskId);
  }

  trackByIndex(index: number, task: Task): number {
    return index;
  }
}
