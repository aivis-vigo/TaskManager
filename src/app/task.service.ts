import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskModel} from "./task.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskSubject = new BehaviorSubject<TaskModel[]>([]);
  tasks$ = this.taskSubject.asObservable();
  FILE_PATH: string = '../../assets/dummy-tasks.json';

  constructor(private http: HttpClient) {
  }

  loadInitialTasks(): Observable<{ data: { tasks: TaskModel[] } }> {
    return this.http.get<{ data: { tasks: TaskModel[] } }>(this.FILE_PATH);
  }

  addTask(newTask: TaskModel): void {
    const tasks = this.taskSubject.getValue();
    this.taskSubject.next([...tasks, newTask]);
  }

  removeTask(taskId: number): void {
    const tasks = this.taskSubject.getValue();
    tasks.splice(taskId, 1);
    this.taskSubject.next([...tasks]);
  }
}
