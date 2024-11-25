import {createAction, props} from "@ngrx/store";
import {AuthorizedUserModel} from "../../shared/models/authorized-user.model";
import {CredentialsModel} from "../../shared/models/credentials.model";
import {LoginCredentialsModel} from "../../shared/models/login-credentials.model";

/* todo: renames as authorization actions */

export const login = createAction(
  '[Login Page] Authenticate',
  props<{ credentials: CredentialsModel }>()
);

export const loginSuccess = createAction(
  '[Login Page] Authentication Success',
  props<{ authorizedUser: AuthorizedUserModel }>()
);

export const register = createAction(
  '[Register Page] Registration',
  props<{ user: LoginCredentialsModel }>()
);

export const registerSuccess = createAction(
  '[Register Page] Registration Success',
  props<{ authorizedUser: AuthorizedUserModel }>()
);
