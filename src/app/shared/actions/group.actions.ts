import {createAction, props} from "@ngrx/store";
import {GroupModel} from "../models/group.model";

export const loadInitialGroups = createAction(
  '[Navigation Bar] View All Groups',
);

export const loadInitialGroupsSuccess= createAction(
  '[Navigation Bar] View All Groups Success',
  props<{ groupList: GroupModel[] }>()
);

export const viewOneGroup = createAction(
  '[Group List] View One Group',
  props<{ groupId: string }>()
);

export const viewOneGroupSuccess = createAction(
  '[Group List] View One Group Success',
  props<{ group: GroupModel }>()
);

export const createGroup = createAction(
  '[Create Group] Create Single Group',
  props<{ group: GroupModel }>()
);

export const createGroupSuccess = createAction(
  '[Create Group] Create Single Group Success',
  props<{ group: GroupModel }>()
);

export const updateGroup = createAction(
  '[Group Details] Update Group Details',
  props<{ groupId: string, group: GroupModel }>(),
);

export const updateGroupSuccess = createAction(
  '[Group Details] Update Group Details Success',
  props<{ group: GroupModel }>(),
);

export const deleteGroup = createAction(
  '[Group List] Delete Group',
  props<{ groupId: string }>(),
);

export const deleteGroupSuccess = createAction(
  '[Group List] Delete Group Success',
  props<{ groupList: GroupModel[] }>(),
);
