import {Component, inject, OnDestroy} from '@angular/core';
import {CreateTaskComponent} from "../create-task/create-task.component";
import {AsyncPipe} from "@angular/common";
import {Observable, Subject, takeUntil, tap} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../shared/models/state.model";
import {deleteTask, viewAll, viewOne} from "../../../shared/actions/list.actions";
import {selectTaskList} from "../../../shared/selectors/list.selectors";
import {TaskModel} from "../../../shared/models/task.model";
import {GroupModel} from "../../../shared/models/group.model";
import {selectGroupList} from "../../../shared/selectors/group.selectors";
import {loadInitialGroups} from "../../../shared/actions/group.actions";
import {UserStore} from "../../../shared/user.store";

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
export class TaskListComponent implements OnDestroy {
  readonly userStore = inject(UserStore);
  tasks$: Observable<TaskModel[]> = this.store.select(selectTaskList);
  groupList$: Observable<GroupModel[]> = this.store.select(selectGroupList);
  destroy: Subject<void> = new Subject();

  constructor(private store: Store<AppState>) {
    this.store.dispatch(viewAll());
    this.store.dispatch(loadInitialGroups());
  }

  belongsToGroup(groupName: string): boolean {
    let isMember = false;

    this.groupList$.pipe(takeUntil(this.destroy)).subscribe((groups: GroupModel[]) => {
      const group = groups.find((group: GroupModel) => group.title === groupName);

      if (group && group.members.includes(this.userStore.user().username)) {
        isMember = true;
      }
    });

    return isMember;
  }

  viewTask(taskId: string): void {
    this.store.dispatch(viewOne({taskId: taskId}));
  }

  removeTask(taskId: string): void {
    this.store.dispatch(deleteTask({taskId: taskId}));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
