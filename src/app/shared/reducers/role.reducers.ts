import {RoleModel} from "../models/role.model";
import {RoleStateModel} from "../models/role-state.model";
import {createReducer, on} from "@ngrx/store";
import * as RoleActions from "../actions/role.actions";


export const initialRoles: RoleStateModel = {
  roleList: [] as RoleModel[]
}

export const roleReducer = createReducer(
  initialRoles,
  on(RoleActions.loadInitialRoles, (state) => ({
      ...state
    })
  ),
  on(RoleActions.loadInitialRolesSuccess, (state, {roles}) => ({
      ...state,
      roleList: roles
    })
  ),
)
