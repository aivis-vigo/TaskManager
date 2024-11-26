import {createAction, props} from "@ngrx/store";
import {AuthorizedUserModel} from "../../shared/models/authorized-user.model";
import {LoginCredentialsModel} from "../../shared/models/login-credentials.model";

export const register = createAction(
  '[Register Page] Registration',
  props<{ user: LoginCredentialsModel }>()
);

export const registerSuccess = createAction(
  '[Register Page] Registration Success',
  props<{ authorizedUser: AuthorizedUserModel }>()
);
