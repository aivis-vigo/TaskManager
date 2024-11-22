import {AppState} from "../models/state.model";
import {createSelector} from "@ngrx/store";
import {RoleListStateModel} from "../../role-list";

export const roleSelector = (state: AppState) => state.roles;

export const selectRoleList = createSelector(
  roleSelector,
  (state: RoleListStateModel) => state.roleList
)
