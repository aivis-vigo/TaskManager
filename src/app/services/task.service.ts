import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskModel} from "../shared/models/task.model";
import {Observable} from "rxjs";
import {environment} from "../../environments/enviornment";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
  }

  loadInitialTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${environment.apiEndpoint}/tasks`);
  }

  getTask(taskId: string): Observable<TaskModel> {
    return this.http.get<TaskModel>(`${environment.apiEndpoint}/tasks/${taskId}`);
  }

  addTask(newTask: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(`${environment.apiEndpoint}/tasks`, newTask);
  }

  updateTask(taskId: string, updatedTask: TaskModel): Observable<TaskModel> {
    return this.http.put<TaskModel>(`${environment.apiEndpoint}/tasks/update/${taskId}`, updatedTask);
  }

  removeTask(taskId: string): Observable<TaskModel[]> {
    return this.http.delete<TaskModel[]>(`${environment.apiEndpoint}/tasks/${taskId}`);
  }
}
