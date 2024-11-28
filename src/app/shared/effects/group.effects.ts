import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as GroupActions from '../actions/group.actions';
import {catchError, EMPTY, map, mergeMap, tap} from "rxjs";
import {GroupService} from "../../services/group.service";
import {GroupModel} from "../models/group.model";
import {Router} from "@angular/router";

@Injectable()
export class GroupEffects {

  loadInitialGroups$ = createEffect(() => this.actions$.pipe(
    ofType(GroupActions.loadInitialGroups),
    mergeMap(() => this.groupService.loadInitialGroups().pipe(
      map((groups: GroupModel[]) => GroupActions.loadInitialGroupsSuccess({groupList: groups})),
      catchError(() => EMPTY)
    )),
  ))

  createGroup$ = createEffect(() => this.actions$.pipe(
    ofType(GroupActions.createGroup),
    mergeMap(({group}) => this.groupService.createGroup(group).pipe(
      map((newGroup: GroupModel) => GroupActions.createGroupSuccess({group: newGroup})),
      catchError(() => EMPTY),
    ))
  ));

  viewOneGroup$ = createEffect(() => this.actions$.pipe(
    ofType(GroupActions.viewOneGroup),
    mergeMap(({groupId}) => this.groupService.getGroup(groupId).pipe(
      map((newGroup: GroupModel) => GroupActions.viewOneGroupSuccess({group: newGroup})),
      catchError(() => EMPTY),
    ))
  ));

  viewOneGroupSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(GroupActions.viewOneGroupSuccess),
      tap(({group}) => {
        this.router.navigate(['/group-list', group._id]);
        return group;
      }),
      catchError(() => EMPTY),
    ),
    {dispatch: false}
  );

  updateGroup$ = createEffect(() => this.actions$.pipe(
      ofType(GroupActions.updateGroup),
      mergeMap(({groupId, group}) => this.groupService.updateGroup(groupId, group).pipe(
        map((updatedGroup: GroupModel) => GroupActions.updateGroupSuccess({group: updatedGroup})),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteGroup$ = createEffect(() => this.actions$.pipe(
    ofType(GroupActions.deleteGroup),
    mergeMap(({groupId}) => this.groupService.removeGroup(groupId).pipe(
      map((groups: GroupModel[]) => GroupActions.deleteGroupSuccess({groupList: groups})),
      catchError(() => EMPTY),
    ))
  ));

  constructor(
    private actions$: Actions,
    private groupService: GroupService,
    private router: Router,
  ) {
  }
}
