import {UserModel} from "../../shared/models/user.model";
import {createReducer, on} from "@ngrx/store";
import * as LoginPageActions from "./login.actions";
import {AuthorizedUserModel} from "../../shared/models/authorized-user.model";

export const initialUser: AuthorizedUserModel = {
  user: {} as UserModel,
  token: ''
}

export const loginReducer = createReducer(
  initialUser,
  on(LoginPageActions.login, (state, {credentials}) => ({
    ...state
  })),
  on(LoginPageActions.loginSuccess, (state, {authorizedUser}) => ({
    ...state,
    user: authorizedUser.user,
    token: authorizedUser.token
  }))
);
