import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, first, Observable} from "rxjs";
import {UserModel} from "../shared/user.model";
import {JsonUsersStructureModel} from "../shared/json-users-structure.model";
import {environment} from "../../environments/enviornment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSubject: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);
  users$: Observable<UserModel[]> = this.userSubject.asObservable();
  FILE_PATH: string = '../../assets/dummy-users.json';

  constructor(private http: HttpClient) {
    this.loadInitialTasks()
      .pipe(first())
      .subscribe((res: JsonUsersStructureModel) => this.userSubject.next(res.data.users));
  }

  loadInitialTasks(): Observable<JsonUsersStructureModel> {
    return this.http.get<JsonUsersStructureModel>(this.FILE_PATH);
  }

  insertDefaultUsers(): Observable<UserModel[]> {
    return this.http.post<UserModel[]>(`${environment.apiEndpoint}/users`, this.userSubject.getValue());
  }

}
