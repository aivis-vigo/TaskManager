import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {map, Observable, Subject, takeUntil, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {UserModel} from "../../../shared/models/user.model";
import {InputValidatorComponent} from "../../shared/input-validator/input-validator.component";
import {FormSubmitButtonComponent} from "../../shared/form-submit-button/form-submit-button.component";
import {RoleModel} from "../../../shared/models/role.model";
import {AsyncPipe} from "@angular/common";
import {TranslateDirective, TranslatePipe} from "@ngx-translate/core";
import {Store} from "@ngrx/store";
import {AppState} from "../../../shared/models/state.model";
import {selectOpenedUser} from "../../../shared/selectors/user.selectors";
import {updateUser} from "../../../shared/actions/user.actions";
import {loadInitialRoles} from "../../../shared/actions/role.actions";
import {selectRoleList} from "../../../shared/selectors/role.selectors";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    InputValidatorComponent,
    FormSubmitButtonComponent,
    ReactiveFormsModule,
    AsyncPipe,
    FormsModule,
    TranslatePipe,
    TranslateDirective
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  roleList$: Observable<RoleModel[]> = this.store.select(selectRoleList).pipe(
    map((roles: RoleModel[]) => roles.filter((role: RoleModel) => role.name !== 'Admin'))
  );
  currentUser: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required]],
    roles: [[], [Validators.required]]
  });
  user: UserModel = <UserModel>{};
  private destroy: Subject<void> = new Subject();
  errorMessage: string = '';
  editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    const userId: string | null = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.store.select(selectOpenedUser)
        .pipe(takeUntil(this.destroy))
        .subscribe((res: UserModel) => {
          this.user = res;
          this.currentUser.setValue({
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            username: this.user.username,
            roles: this.user.roles,
          });
        });
    } else {
      this.errorMessage = `Failed to fetch user with id: ${userId}`;
    }
    this.store.dispatch(loadInitialRoles());
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  manageRole(role: string, input: EventTarget | null): void {
    const isChecked = (input as HTMLInputElement).checked;

    if (this.roles) {
      const roles = [...this.roles.value];

      if (isChecked) {
        if (!roles.includes(role)) {
          roles.push(role);
        }
      } else {
        const filteredRoles = roles.filter(currentRole => currentRole !== role);
        this.roles.setValue(filteredRoles);
        return;
      }

      this.roles.setValue(roles);
    }
  }

  isRoleChecked(roleName: string): boolean {
    const roles = this.currentUser.get('roles');
    return roles ? roles.value.includes(roleName) : false;
  }

  onUpdate(user: UserModel, updatedUser: FormGroup): void {
    this.store.dispatch(updateUser({userId: user._id, user: updatedUser.value}));
    this.toggleEditMode();
  }

  get firstName() {
    return this.currentUser.get('firstName');
  }

  get lastName() {
    return this.currentUser.get('lastName');
  }

  get username() {
    return this.currentUser.get('username');
  }

  get roles() {
    return this.currentUser.get('roles');
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
