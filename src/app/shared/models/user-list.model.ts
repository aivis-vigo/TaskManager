import {UserModel} from "./user.model";

export interface UserListStateModel {
  userList: UserModel[],
  openedUser: UserModel
}
