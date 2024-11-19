import {Component, OnDestroy, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {UserModel} from "../../shared/models/user.model";
import {InputValidatorComponent} from "../input-validator/input-validator.component";
import {FormSubmitButtonComponent} from "../form-submit-button/form-submit-button.component";
import {RoleService} from "../../services/role.service";
import {RoleModel} from "../../shared/models/role.model";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    InputValidatorComponent,
    FormSubmitButtonComponent,
    ReactiveFormsModule,
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy {
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
    protected userService: UserService,
    protected roleService: RoleService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const userId: string | null = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUser(userId)
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
    this.roleService.loadInitialRoles()
      .pipe(takeUntil(this.destroy))
      .subscribe((res: RoleModel[]) => {
        const filtered = res.filter(res => res.name !== 'Admin');
        this.roleService.roleSubject.next(filtered);
      })
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  manageRole(role: string, input: EventTarget | null): void {
    const currentRoles = (this.currentUser.get('roles') as FormArray).value;
    const isChecked = (input as HTMLInputElement).checked;

    if (isChecked) {
      currentRoles.push(this.fb.control(role).value);
    } else {
      const index = currentRoles.findIndex((currentRole: string) => currentRole === role);
      if (index !== -1) {
        currentRoles.splice(index, 1);
      }
    }

    if (this.role && currentRoles) {
      this.role.setValue(currentRoles);
    }
  }

  isRoleChecked(roleName: string): boolean {
    const roles = this.currentUser.get('roles');
    return roles ? roles.value.includes(roleName) : false;
  }

  onUpdate(user: UserModel, updatedUser: FormGroup): void {
    this.userService.updateUser(user._id, updatedUser.value)
      .pipe(takeUntil(this.destroy))
      .subscribe((res: UserModel) => {
        this.user = res;
        this.toggleEditMode();
      })
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

  get role() {
    return this.currentUser.get('roles');
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
