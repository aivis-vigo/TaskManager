import {createReducer, on} from "@ngrx/store";
import * as GroupActions from "../actions/group.actions";
import {GroupModel} from "../models/group.model";
import {GroupStateModel} from "../models/group-state.model";
import {group} from "@angular/animations";

export const initialState: GroupStateModel = {
  allGroups: [] as GroupModel[],
  currentGroup: {} as GroupModel
}

export const groupReducer = createReducer(
  initialState,
  on(GroupActions.createGroup, (state) => ({
    ...state,
  })),
  on(GroupActions.createGroupSuccess, (state, {group}) => ({
    ...state,
    currentGroup: group
  })),
  on(GroupActions.loadInitialGroups, (state) => ({
    ...state
  })),
  on(GroupActions.loadInitialGroupsSuccess, (state, {groupList}) => ({
    ...state,
    allGroups: groupList
  })),
  on(GroupActions.viewOneGroup, (state) => ({
    ...state,
  })),
  on(GroupActions.viewOneGroupSuccess, (state, {group}) => ({
    ...state,
    currentGroup: group
  })),
  on(GroupActions.updateGroup, (state) => ({
    ...state,
  })),
  on(GroupActions.updateGroupSuccess, (state, {group}) => ({
    ...state,
    currentGroup: group
  })),
  on(GroupActions.deleteGroup, (state) => ({
    ...state
  })),
  on(GroupActions.deleteGroup, (state) => ({
    ...state,
  })),
  on(GroupActions.deleteGroupSuccess, (state, {groupList}) => ({
    ...state,
    allGroups: groupList,
  })),
)
