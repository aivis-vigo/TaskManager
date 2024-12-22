import {createReducer, on} from "@ngrx/store";
import * as UserActions from "../actions/user.actions";
import {UserListStateModel} from "../models/user-list.model";
import {UserModel} from "../models/user.model";

export const initialUsers: UserListStateModel = {
  userList: [] as UserModel[],
  openedUser: {} as UserModel
}

export const userReducer = createReducer(
  initialUsers,
  on(UserActions.loadInitialUsersSuccess, (state, {users}) => ({
    ...state,
    userList: users
  })),
  on(UserActions.viewOneSuccess, (state, {user}) => ({
    ...state,
    openedUser: user
  })),
  on(UserActions.updateUserSuccess, (state, {user}) => ({
    ...state,
    openedUser: user
  }))
);
