import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {AuthorizedUserModel} from "../../shared/models/authorized-user.model";
import {HttpErrorResponse} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {matchingPasswordsValidator} from "../../shared/matching-passwords.directive";
import {InputValidatorComponent} from "../input-validator/input-validator.component";
import {NgClass} from "@angular/common";
import {FormSubmitButtonComponent} from "../form-submit-button/form-submit-button.component";
import {TranslateDirective, TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputValidatorComponent,
    NgClass,
    FormSubmitButtonComponent,
    TranslatePipe,
    TranslateDirective
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnDestroy {
  credentials: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    role: [['User'], [Validators.required]],
    confirmPassword: ['', [
      Validators.required,
      matchingPasswordsValidator('password')
    ]],
  });
  private destroy: Subject<void> = new Subject();
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }

  onSubmit(): void {
    this.userService.register(this.credentials.value)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (res: AuthorizedUserModel) => {
          localStorage.setItem('userId', res.user._id);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', res.token);
          localStorage.setItem('fullName', `${res.user.firstName} ${res.user.lastName}`);

          this.userService.currentUserSig.set(res.user);

          this.router.navigateByUrl('/task-list');
        },
        error: (res: HttpErrorResponse) => this.errorMessage = res.error.message
      });
  }

  get firstName() {
    return this.credentials.get('firstName');
  }

  get lastName() {
    return this.credentials.get('lastName');
  }

  get username() {
    return this.credentials.get('username');
  }

  get password() {
    return this.credentials.get('password');
  }

  get confirmPassword() {
    return this.credentials.get('confirmPassword');
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

}
