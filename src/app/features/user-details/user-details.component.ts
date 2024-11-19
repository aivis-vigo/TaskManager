import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject, takeUntil} from "rxjs";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {UserModel} from "../../shared/models/user.model";
import {InputValidatorComponent} from "../input-validator/input-validator.component";
import {FormSubmitButtonComponent} from "../form-submit-button/form-submit-button.component";
import {RoleService} from "../../services/role.service";
import {RoleModel} from "../../shared/models/role.model";
import {AsyncPipe} from "@angular/common";
import {TranslateDirective, TranslatePipe} from "@ngx-translate/core";
import {LanguageService} from "../../services/language.service";

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
    private route: ActivatedRoute,
    private languageService: LanguageService
  ) {
  }

  ngOnInit(): void {
    const userId: string | null = this.route.snapshot.paramMap.get('id');
    if (userId) {
      const fetchedUser: Observable<UserModel> = this.userService.getUser(userId);
      if (fetchedUser) {
        fetchedUser
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
    const currentRoles = (this.currentUser.get('role') as FormArray).value;
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

  onUpdate(): void {
    this.userService.updateUser(this.user._id, this.currentUser.value)
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
    return this.currentUser.get('role');
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
