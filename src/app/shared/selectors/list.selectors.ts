import {createSelector} from "@ngrx/store";
import {AppState} from "../models/state.model";
import {TaskListStateModel} from "../models/task-list.model";

export const taskListSelector =  (state: AppState) => state.tasks;

export const selectTaskList = createSelector(
  taskListSelector,
  (state: TaskListStateModel) => state.taskList,
)

export const selectOpenedTask = createSelector(
  taskListSelector,
  (state: TaskListStateModel) => state.openedTask
)
