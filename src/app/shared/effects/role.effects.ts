import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as RoleActions from "../actions/role.actions";
import {catchError, EMPTY, map, mergeMap} from "rxjs";
import {RoleModel} from "../models/role.model";
import {RoleService} from "../../services/role.service";

@Injectable()
export class RoleEffects {

  constructor(
    private actions$: Actions,
    private roleService: RoleService,
  ) {
  }

  initialRoles$ = createEffect(() => this.actions$.pipe(
    ofType(RoleActions.loadInitialRoles),
    mergeMap(() => this.roleService.loadInitialRoles().pipe(
      map((roleList: RoleModel[]) => RoleActions.loadInitialRolesSuccess({roles: roleList})),
      catchError(() => EMPTY)
    ))
  ));

}
