import {createAction, props} from "@ngrx/store";
import {UserModel} from "../models/user.model";

export const loadInitialUsers = createAction('[Task Details] Load Initial Users');

export const loadInitialUsersSuccess = createAction(
  '[Task Details] Load Initial Users Success',
  props<{ users: UserModel[] }>()
);

export const viewOne = createAction(
  '[User List] View Specific User',
  props<{ userId: string }>()
);

export const viewOneSuccess = createAction(
  '[User List] View Specific User Success',
  props<{ user: UserModel }>()
);

export const updateUser = createAction(
  '[User Details] Update User',
  props<{ userId: string, user: UserModel }>()
);

export const updateUserSuccess = createAction(
  '[User Details] Update User Success',
  props<{ user: UserModel }>()
);
