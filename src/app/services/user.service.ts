import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../shared/models/user.model";
import {environment} from "../../environments/enviornment";
import {LoginCredentialsModel} from "../shared/models/login-credentials.model";
import {AuthorizedUserModel} from "../shared/models/authorized-user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) {
  }

  loadInitialUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${environment.apiEndpoint}/users`);
  }

  register(credentials: LoginCredentialsModel): Observable<AuthorizedUserModel> {
    return this.http.post<AuthorizedUserModel>(`${environment.apiEndpoint}/register`, credentials);
  }

  login(credentials: LoginCredentialsModel): Observable<AuthorizedUserModel> {
    return this.http.post<AuthorizedUserModel>(`${environment.apiEndpoint}/login`, credentials);
  }

  getUser(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${environment.apiEndpoint}/users/${id}`);
  }

  updateUser(userId: string, updatedUser: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${environment.apiEndpoint}/users/update/${userId}`, updatedUser);
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  getFullName(): string | null {
    return localStorage.getItem('fullName');
  }

}
