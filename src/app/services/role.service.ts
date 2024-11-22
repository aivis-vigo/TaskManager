import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoleModel} from "../shared/models/role.model";
import {environment} from "../../environments/enviornment";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {
  }

  loadInitialRoles(): Observable<RoleModel[]> {
    return this.http.get<RoleModel[]>(`${environment.apiEndpoint}/roles`);
  }
}
