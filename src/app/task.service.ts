import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "./task";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.taskSubject.asObservable();
  FILE_PATH: string = '../../assets/dummy-tasks.json';

  constructor(private http: HttpClient) {
    this.loadInitialTasks();
  }

  loadInitialTasks(): void {
    this.http.get<{ data: { tasks: Task[] } }>(this.FILE_PATH)
      .subscribe(response => {
        const tasks = response.data.tasks;
        this.taskSubject.next(tasks);
      })
  }

  getTasks() {
    return this.tasks$;
  }

  addTask(newTask: Task): void {
    const tasks = this.taskSubject.getValue();
    this.taskSubject.next([...tasks, newTask]);
  }

  removeTask(taskId: number): void {
    const tasks = this.taskSubject.getValue();
    tasks.splice(taskId, 1);
    this.taskSubject.next([...tasks]);
  }
}
