import {AppState} from "../models/state.model";
import {createSelector} from "@ngrx/store";
import {RoleListStateModel} from "../models/role-list.model";

export const roleSelector = (state: AppState) => state.roles;

export const selectRoleList = createSelector(
  roleSelector,
  (state: RoleListStateModel) => state.roleList
)
