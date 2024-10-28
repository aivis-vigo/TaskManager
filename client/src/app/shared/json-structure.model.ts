import {TaskModel} from "./task.model";

export interface JsonStructureModel {
  data: {
    tasks: TaskModel[]
  }
}
