import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskModel} from "../shared/task.model";
import {BehaviorSubject, first, Observable, tap} from "rxjs";
import {environment} from "../../environments/enviornment";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskSubject: BehaviorSubject<TaskModel[]> = new BehaviorSubject<TaskModel[]>([]);
  tasks$: Observable<TaskModel[]> = this.taskSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialTasks()
      .pipe(first())
      .subscribe((res: TaskModel[]) => this.taskSubject.next(res));
  }

  loadInitialTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${environment.apiEndpoint}/tasks`);
  }

  getTask(taskId: string): Observable<TaskModel> {
    return this.http.get<TaskModel>(`${environment.apiEndpoint}/tasks/${taskId}`);
  }

  addTask(newTask: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(`${environment.apiEndpoint}/tasks`, newTask)
      .pipe(tap((res: TaskModel) => {
        const tasks = this.taskSubject.getValue();
        this.taskSubject.next([...tasks, res])
      }));
  }

  updateTask(taskId: string, updatedTask: TaskModel): Observable<TaskModel> {
    return this.http.put<TaskModel>(`${environment.apiEndpoint}/tasks/update/${taskId}`, updatedTask);
  }

  removeTask(taskId: string): Observable<TaskModel[]> {
    return this.http.delete<TaskModel[]>(`${environment.apiEndpoint}/tasks/${taskId}`)
      .pipe(tap((res: TaskModel[]): void => {
        this.taskSubject.next(res);
      }));
  }
}
