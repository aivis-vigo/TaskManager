import {AppState} from "../models/state.model";
import {createSelector} from "@ngrx/store";
import {UserListStateModel} from "../models/user-list.model";

export const userSelector = (state: AppState) => state.users;

export const selectUserList = createSelector(
  userSelector,
  (state: UserListStateModel) => state.userList
);

export const selectOpenedUser = createSelector(
  userSelector,
  (state: UserListStateModel) => state.openedUser
);
