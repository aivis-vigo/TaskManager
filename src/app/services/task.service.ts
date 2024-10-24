import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskModel} from "../shared/task.model";
import {BehaviorSubject, first, Observable} from "rxjs";
import {JsonStructureModel} from "../shared/json-structure.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskSubject = new BehaviorSubject<TaskModel[]>([]);
  tasks$ = this.taskSubject.asObservable();
  FILE_PATH: string = '../../../assets/dummy-tasks.json';

  constructor(private http: HttpClient) {
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

  getTask(taskId: number): TaskModel {
    const tasks = this.taskSubject.getValue();
    return <TaskModel>tasks.find(task => task.id === taskId);
  }
}
