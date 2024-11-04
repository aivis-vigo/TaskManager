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

  addTask(newTask: TaskModel): Observable<TaskModel> {
    return this.http.post<TaskModel>(`${environment.apiEndpoint}/tasks`, newTask)
      .pipe(tap((res: TaskModel) => {
        const tasks = this.taskSubject.getValue();
        this.taskSubject.next([...tasks, res])
      }));
  }

  removeTask(taskId: number): void {
    const tasks = this.taskSubject.getValue();
    tasks.splice(taskId, 1);
    this.taskSubject.next([...tasks]);
  }

  getTask(taskId: number): Observable<TaskModel> {
    return this.http.get<TaskModel>(`${environment.apiEndpoint}/tasks/${taskId}`);
  }
}
