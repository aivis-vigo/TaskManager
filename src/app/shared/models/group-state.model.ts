import {GroupModel} from "./group.model";

export interface GroupStateModel {
  currentGroup: GroupModel,
  allGroups: GroupModel[],
}
