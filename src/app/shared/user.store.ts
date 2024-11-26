import {getState, patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {AuthorizedUserModel} from "./models/authorized-user.model";
import {UserModel} from "./models/user.model";
import {computed, inject} from "@angular/core";
import {UserService} from "../services/user.service";
import {LoginCredentialsModel} from "./models/login-credentials.model";
import {catchError, EMPTY, tap} from "rxjs";

const userState: AuthorizedUserModel = {
  user: {} as UserModel,
  token: ''
};

export const UserStore = signalStore(
  {providedIn: 'root'},
  withState(userState),
  withComputed(({user, token}) => ({
    isLoggedIn: computed(() => user() !== userState.user && token() !== '')
  })),
  withMethods((store, userService = inject(UserService)) => ({

      login(credentials: LoginCredentialsModel) {
        return userService.login(credentials).pipe(
          tap((res: AuthorizedUserModel) => {
            patchState(store, () => ({
              user: res.user,
              token: res.token
            }));
          }),
          catchError((error) => {
            console.log('Login failed:', error);
            return EMPTY;
          })
        );
      },

      isAuthorized(role: string): boolean {
        return store.user().roles.includes(role);
      },

      logout(): void {
        localStorage.clear();
        patchState(store, () => ({
          user: userState.user,
          token: userState.token,
        }));
      }

    }),
  ),
);
