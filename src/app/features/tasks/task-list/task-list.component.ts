import {Component} from '@angular/core';
import {CreateTaskComponent} from "../create-task/create-task.component";
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../shared/models/state.model";
import {deleteTask, viewAll, viewOne} from "../../../shared/actions/list.actions";
import {selectTaskList} from "../../../shared/selectors/list.selectors";
import {TaskModel} from "../../../shared/models/task.model";

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
export class TaskListComponent {
  tasks$: Observable<TaskModel[]> = this.store.select(selectTaskList);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(viewAll());
  }

  viewTask(taskId: string): void {
    this.store.dispatch(viewOne({taskId: taskId}));
  }

  removeTask(taskId: string): void {
    this.store.dispatch(deleteTask({taskId: taskId}));
  }
}
