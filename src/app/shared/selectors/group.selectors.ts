import {AppState} from "../models/state.model";
import {createSelector} from "@ngrx/store";
import {GroupStateModel} from "../models/group-state.model";

export const groupSelector = (state: AppState) => state.groups;

export const selectCurrentGroup = createSelector(
  groupSelector,
  (state: GroupStateModel) => state.currentGroup,
);

export const selectGroupList = createSelector(
  groupSelector,
  (state: GroupStateModel) => state.allGroups
)
