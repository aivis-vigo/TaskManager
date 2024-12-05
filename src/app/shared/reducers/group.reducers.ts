import {createReducer, on} from "@ngrx/store";
import * as GroupActions from "../actions/group.actions";
import {GroupModel} from "../models/group.model";
import {GroupStateModel} from "../models/group-state.model";

export const initialState: GroupStateModel = {
  allGroups: [] as GroupModel[],
  currentGroup: {} as GroupModel
}

export const groupReducer = createReducer(
  initialState,
  on(GroupActions.createGroupSuccess, (state, {group}) => ({
    ...state,
    currentGroup: group
  })),
  on(GroupActions.loadInitialGroupsSuccess, (state, {groupList}) => ({
    ...state,
    allGroups: groupList
  })),
  on(GroupActions.viewOneGroupSuccess, (state, {group}) => ({
    ...state,
    currentGroup: group
  })),
  on(GroupActions.updateGroupSuccess, (state, {group}) => ({
    ...state,
    currentGroup: group
  })),
  on(GroupActions.deleteGroupSuccess, (state, {groupList}) => ({
    ...state,
    allGroups: groupList,
  })),
)
