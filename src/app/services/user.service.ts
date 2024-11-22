import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../shared/models/user.model";
import {environment} from "../../environments/enviornment";
import {LoginCredentialsModel} from "../shared/models/login-credentials.model";
import {AuthorizedUserModel} from "../shared/models/authorized-user.model";
import {Store} from "@ngrx/store";
import {AppState} from "../shared/models/state.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserSig: WritableSignal<UserModel | null> = signal<UserModel | null>(null);

  constructor(
    private http: HttpClient,
    private store: Store<AppState>
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

  isAuthorized(role: string): boolean {
    /* todo: uncomment when done */
    /* todo: make it work from user roles not signal */
    /*const currentUser : UserModel | null = this.currentUserSig();
    return currentUser ? currentUser.roles.includes(role) : false;*/
    return true;
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  getFullName(): string | null {
    return localStorage.getItem('fullName');
  }

}
