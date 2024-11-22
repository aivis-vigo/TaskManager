import {Injectable} from "@angular/core";
import {UserService} from "../../services/user.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, EMPTY, map, mergeMap, tap} from "rxjs";
import * as LoginPageActions from "./login.actions";
import {AuthorizedUserModel} from "../../shared/models/authorized-user.model";
import {Router} from "@angular/router";

@Injectable()
export class LoginEffects {

  loadUser$ = createEffect(() => this.actions$.pipe(
      ofType(LoginPageActions.login),
      mergeMap(({credentials}) => this.userService.login(credentials)
        .pipe(
          map((user: AuthorizedUserModel) => LoginPageActions.loginSuccess({authorizedUser: user})),
          catchError(() => EMPTY)
        )
      )
    )
  );

  redirectAfterLogin$ = createEffect(() => this.actions$.pipe(
      ofType(LoginPageActions.loginSuccess),
      tap(({authorizedUser}) => {
        localStorage.setItem('userId', authorizedUser.user._id);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', authorizedUser.token);
        localStorage.setItem('fullName', `${authorizedUser.user.firstName} ${authorizedUser.user.lastName}`);

        this.router.navigateByUrl('/task-list');
        return authorizedUser;
      })
    ),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
  ) {
  }
}
