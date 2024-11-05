import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskModel} from "../shared/task.model";
import {BehaviorSubject, first, Observable, tap} from "rxjs";
import {environment} from "../../environments/enviornment";
import {DeleteResponseModel} from "../shared/delete-response.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskSubject = new BehaviorSubject<TaskModel[]>([]);
  tasks$: Observable<TaskModel[]> = this.taskSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialTasks()
      .pipe(first())
      .subscribe((res) => this.taskSubject.next(res));
  }

  loadInitialTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(`${environment.apiEndpoint}/tasks`);
  }

  addTask(newTask: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(`${environment.apiEndpoint}/tasks`, newTask)
      .pipe(tap((res: TaskModel) => {
        const tasks = this.taskSubject.getValue();
        this.taskSubject.next([...tasks, res])
      }));
  }

  removeTask(taskId: string): Observable<DeleteResponseModel> {
    return this.http.delete<DeleteResponseModel>(`${environment.apiEndpoint}/tasks/${taskId}`)
      .pipe(tap((): void => {
        const tasks: TaskModel[] = this.taskSubject.getValue();
        const filteredTasks: TaskModel[] = tasks.filter((task: TaskModel) => task._id !== taskId);
        this.taskSubject.next(filteredTasks);
      }));
  }

  getTask(taskId: string): Observable<TaskModel> {
    return this.http.get<TaskModel>(`${environment.apiEndpoint}/tasks/${taskId}`);
  }
}
