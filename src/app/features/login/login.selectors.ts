import {AuthorizedUserModel} from "../../shared/models/authorized-user.model";
import {createSelector} from "@ngrx/store";
import {AppState} from "../../shared/models/state.model";

export const selectAuthorizedUser = (state: AppState) => state.login;

export const selectCurrentUser = createSelector(
  selectAuthorizedUser,
  (state: AuthorizedUserModel) => state.user
);

export const  selectCurrentUsersToken = createSelector(
  selectAuthorizedUser,
  (state: AuthorizedUserModel) => state.token
)
