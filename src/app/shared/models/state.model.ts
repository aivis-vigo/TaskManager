import {AuthorizedUserModel} from "./authorized-user.model";
import {TaskListStateModel} from "./task-list.model";
import {UserListStateModel} from "./user-list.model";
import {RoleListStateModel} from "./role-list.model";

export interface AppState {
  login: AuthorizedUserModel,
  tasks: TaskListStateModel,
  users: UserListStateModel,
  roles: RoleListStateModel
}
