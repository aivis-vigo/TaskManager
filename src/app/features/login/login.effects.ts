import {Injectable} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, map, mergeMap, tap} from "rxjs";
import * as LoginPageActions from "./login.actions";
import {AuthorizedUserModel} from "../../shared/models/authorized-user.model";
import {Router} from "@angular/router";

@Injectable()
export class LoginEffects {

  registerUser$ = createEffect(() => this.actions$.pipe(
      ofType(LoginPageActions.register),
      mergeMap(({user}) => this.userService.register(user)
        .pipe(
          map((newUser: AuthorizedUserModel) => LoginPageActions.registerSuccess({authorizedUser: newUser})),
          catchError(() => EMPTY)
        )
      )
    )
  );

  registerUserSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(LoginPageActions.registerSuccess),
      tap(({authorizedUser}) => {
          localStorage.setItem('userId', authorizedUser.user._id);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', authorizedUser.token);
          localStorage.setItem('fullName', `${authorizedUser.user.firstName} ${authorizedUser.user.lastName}`);

          this.router.navigateByUrl('/task-list');
        }
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
  ) {
  }
}
