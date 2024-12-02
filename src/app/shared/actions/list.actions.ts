import {createAction, props} from "@ngrx/store";
import {TaskModel} from "../models/task.model";

export const viewAll = createAction('[Task List] View')

export const viewAllSuccess = createAction(
  '[Task List] View Success',
  props<{ tasks: TaskModel[] }>()
);

export const viewOne = createAction(
  '[Task List] View Specific Task',
  props<{ taskId: string }>()
);

export const viewOneSuccess = createAction(
  '[Task List] View Specific Task Success',
  props<{ task: TaskModel }>()
);

export const createTask = createAction(
  '[Create Task] New Task',
  props<{ task: TaskModel }>()
);

export const createTaskSuccess = createAction(
  '[Create Task] New Task Success',
  props<{ task: TaskModel }>()
);

export const updateTask = createAction(
  '[Task Details] Update Task',
  props<{ taskId: string, task: TaskModel }>()
);

export const updateTaskSuccess = createAction(
  '[Task Details] Update Task Success',
  props<{ updatedTask: TaskModel }>()
)

export const deleteTask = createAction(
  '[Task List] Delete Task',
  props<{ taskId: string }>()
);

export const deleteTaskSuccess = createAction(
  '[Task List] Delete Task Success',
  props<{ taskList: TaskModel[] }>()
);
