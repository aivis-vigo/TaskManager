import {UserModel} from "../../../shared/models/user.model";
import {createReducer} from "@ngrx/store";
import {AuthorizedUserModel} from "../../../shared/models/authorized-user.model";

export const initialUser: AuthorizedUserModel = {
  user: {} as UserModel,
  token: ''
}

export const loginReducer = createReducer(
  initialUser,
);
