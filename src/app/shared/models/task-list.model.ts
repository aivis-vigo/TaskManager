import {TaskModel} from "./task.model";

export interface TaskListStateModel {
  taskList: TaskModel[],
  openedTask: TaskModel
}
