import {createAction, props} from "@ngrx/store";
import {AuthorizedUserModel} from "../../shared/models/authorized-user.model";
import {CredentialsModel} from "../../shared/models/credentials.model";

export const login = createAction(
  '[Login Page] Authenticate',
  props<{ credentials: CredentialsModel }>()
);

export const loginSuccess = createAction(
  '[Login Page] Authentication Success',
  props<{ authorizedUser: AuthorizedUserModel }>()
)
