import {Component} from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {TranslateDirective, TranslatePipe} from "@ngx-translate/core";
import {Store} from "@ngrx/store";
import {AppState} from "../../shared/models/state.model";
import {loadInitialUsers} from "../../shared/actions/user.actions";
import {viewOne} from "../../shared/actions/user.actions";
import {selectUserList} from "../../shared/selectors/user.selectors";
import {Observable} from "rxjs";
import {UserModel} from "../../shared/models/user.model";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    AsyncPipe,
    TranslatePipe,
    TranslateDirective
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  userList$: Observable<UserModel[]> = this.store.select(selectUserList);

  constructor(
    protected userService: UserService,
    private store: Store<AppState>
  ) {
    this.store.dispatch(loadInitialUsers());
  }

  viewUser(userId: string): void {
    this.store.dispatch(viewOne({userId: userId}));
  }
}
