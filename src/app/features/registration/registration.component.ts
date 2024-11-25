import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {matchingPasswordsValidator} from "../../shared/directives/matching-passwords.directive";
import {InputValidatorComponent} from "../input-validator/input-validator.component";
import {NgClass} from "@angular/common";
import {FormSubmitButtonComponent} from "../form-submit-button/form-submit-button.component";
import {TranslateDirective, TranslatePipe} from "@ngx-translate/core";
import {AppState} from "../../shared/models/state.model";
import {Store} from "@ngrx/store";
import {register} from "../login/login.actions";

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
export class RegistrationComponent {
  credentials: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [
      Validators.required,
      matchingPasswordsValidator('password')
    ]]
  });
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
  }

  onSubmit(): void {
    this.store.dispatch(register({user: this.credentials.value}));
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

}
