import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, first, Observable} from "rxjs";
import {UserModel} from "../shared/user.model";
import {environment} from "../../environments/enviornment";

/* todo: delete word */

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSubject: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);
  users$: Observable<UserModel[]> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialUsers()
      .pipe(first())
      .subscribe((res: UserModel[]) => this.userSubject.next(res));
  }

  loadInitialUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${environment.apiEndpoint}/users`);
  }
}
