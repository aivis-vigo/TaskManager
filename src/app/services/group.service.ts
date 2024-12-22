import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/enviornment";
import {GroupModel} from "../shared/models/group.model";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) {
  }

  loadInitialGroups(): Observable<GroupModel[]> {
    return this.http.get<GroupModel[]>(`${environment.apiEndpoint}/groups`);
  }

  createGroup(group: GroupModel): Observable<GroupModel> {
    return this.http.post<GroupModel>(`${environment.apiEndpoint}/groups/create`, group);
  }

  getGroup(groupId: string): Observable<GroupModel> {
    return this.http.get<GroupModel>(`${environment.apiEndpoint}/groups/${groupId}`);
  }

  updateGroup(groupId: string, updatedGroup: GroupModel): Observable<GroupModel> {
    return this.http.put<GroupModel>(`${environment.apiEndpoint}/groups/update/${groupId}`, updatedGroup);
  }

  removeGroup(groupId: string): Observable<GroupModel[]> {
    return this.http.delete<GroupModel[]>(`${environment.apiEndpoint}/groups/${groupId}`);
  }

}
