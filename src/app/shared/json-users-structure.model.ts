import {UserModel} from "./user.model";

export interface JsonUsersStructureModel {
  data: {
    users: UserModel[]
  }
}
