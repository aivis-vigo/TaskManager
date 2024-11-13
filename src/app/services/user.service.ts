import {Injectable, signal, Signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, first, Observable} from "rxjs";
import {UserModel} from "../shared/models/user.model";
import {environment} from "../../environments/enviornment";
import {TaskModel} from "../shared/models/task.model";
import {LoginCredentialsModel} from "../shared/models/login-credentials.model";
import {AuthorizedUserModel} from "../shared/models/authorized-user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSubject: BehaviorSubject<UserModel[]> = new BehaviorSubject<UserModel[]>([]);
  users$: Observable<UserModel[]> = this.userSubject.asObservable();
  currentUserSig: WritableSignal<UserModel | null> = signal<UserModel | null>(null);

  constructor(private http: HttpClient) {
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

  logout(): void {
    localStorage.clear();
    this.currentUserSig.set(null);
  }

  getUser(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${environment.apiEndpoint}/users/${id}`);
  }

  updateUser(userId: string, updatedUser: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${environment.apiEndpoint}/users/update/${userId}`, updatedUser);
  }

  isAuthorized(): boolean {
    const currentUser = this.currentUserSig();
    return currentUser ? currentUser.role.includes('Admin') : false;
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  getFullName(): string | null {
    return localStorage.getItem('fullName');
  }

}
