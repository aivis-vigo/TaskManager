import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskModel} from "../shared/task.model";
import {BehaviorSubject, first, map, Observable, Subject, takeUntil, tap} from "rxjs";
import {JsonStructureModel} from "../shared/json-structure.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskSubject = new BehaviorSubject<TaskModel[]>([]);
  tasks$ = this.taskSubject.asObservable();
  FILE_PATH: string = '../../../assets/dummy-tasks.json';

  constructor(private http: HttpClient) {
    this.loadInitialTasks()
      .pipe(first())
      .subscribe((res: JsonStructureModel) => this.taskSubject.next(res.data.tasks));
  }

  loadInitialTasks(): Observable<JsonStructureModel> {
    return this.http.get<JsonStructureModel>(this.FILE_PATH);
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
