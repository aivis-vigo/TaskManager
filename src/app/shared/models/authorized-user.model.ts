import {UserModel} from "./user.model";

export interface AuthorizedUserModel {
  user: UserModel,
  token: string;
}
