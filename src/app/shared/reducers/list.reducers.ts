import {createReducer, on} from "@ngrx/store";
import * as TaskListActions from "../actions/list.actions";
import {TaskModel} from "../models/task.model";

export const initialTasks = {
  taskList: [] as TaskModel[],
  openedTask: {} as TaskModel
}

export const taskReducer = createReducer(
  initialTasks,
  on(TaskListActions.viewAllSuccess, (state, {tasks}) => ({
    ...state,
    taskList: tasks
  })),
  on(TaskListActions.viewOneSuccess, (state, {task}) => ({
    ...state,
    openedTask: task
  })),
  on(TaskListActions.createTaskSuccess, (state, {task}) => ({
      ...state,
      taskList: [...state.taskList, task]
    })
  ),
  on(TaskListActions.updateTaskSuccess, (state, {updatedTask}) => ({
    ...state,
    openedTask: updatedTask
  })),
  on(TaskListActions.deleteTaskSuccess, (state, {taskList}) => ({
    ...state,
    taskList: taskList
  })),
);
