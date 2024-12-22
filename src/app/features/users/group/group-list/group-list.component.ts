import {Component} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../../shared/models/state.model";
import {deleteGroup, loadInitialGroups, viewOneGroup} from "../../../../shared/actions/group.actions";
import {Observable} from "rxjs";
import {GroupModel} from "../../../../shared/models/group.model";
import {selectGroupList} from "../../../../shared/selectors/group.selectors";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss'
})
export class GroupListComponent {
  groupList$: Observable<GroupModel[]> = this.store.select(selectGroupList);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(loadInitialGroups());
  }

  viewGroup(groupId: string): void {
    this.store.dispatch(viewOneGroup({groupId: groupId}));
  }

  removeGroup(groupId: string): void {
    this.store.dispatch(deleteGroup({groupId: groupId}));
  }

}
