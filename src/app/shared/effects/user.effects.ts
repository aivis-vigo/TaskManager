import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import * as UserActions from "../actions/user.actions";
import {catchError, EMPTY, map, mergeMap, tap} from "rxjs";
import {UserService} from "../../services/user.service";
import {UserModel} from "../models/user.model";
import {Router} from "@angular/router";

/* todo: error handling also for tasks */

@Injectable()
export class UserEffects {

  loadInitialUsers$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.loadInitialUsers),
      mergeMap(() => this.userService.loadInitialUsers().pipe(
        map((userList: UserModel[]) => UserActions.loadInitialUsersSuccess({users: userList})),
        catchError(() => EMPTY)
      ))
    )
  );

  viewOneUser$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.viewOne),
      mergeMap(({userId}) => this.userService.getUser(userId).pipe(
        map((currentUser: UserModel) => UserActions.viewOneSuccess({user: currentUser})),
        catchError(() => EMPTY)
      ))
    )
  );

  viewOneUserSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.viewOneSuccess),
      tap(({user}) => {
        this.router.navigate(['/user-list', user._id]);
        return user;
      })
    ),
    {dispatch: false}
  );

  updateUser$ = createEffect(() => this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap(({userId, user}) => this.userService.updateUser(userId, user).pipe(
        map((currentUser: UserModel) => UserActions.updateUserSuccess({user: currentUser})),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
  ) {
  }
}
