import {createAction, props} from "@ngrx/store";
import {RoleModel} from "../models/role.model";

export const loadInitialRoles = createAction('[User Details] Load Initial Roles');

export const loadInitialRolesSuccess = createAction(
  '[User Details] Load Initial Roles Success',
  props<{ roles: RoleModel[] }>()
);
