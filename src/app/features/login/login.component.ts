import {Component, inject, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {Subject, takeUntil} from "rxjs";
import {TranslateDirective, TranslatePipe} from "@ngx-translate/core";
import {UserStore} from "../../shared/user.store";
import {AuthorizedUserModel} from "../../shared/models/authorized-user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    TranslatePipe,
    TranslateDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  readonly userStore = inject(UserStore);
  credentials: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  private destroy: Subject<void> = new Subject();
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  onSubmit(): void {
    this.userStore.login(this.credentials.value)
      .pipe(takeUntil(this.destroy))
      .subscribe((res: AuthorizedUserModel) => {
        localStorage.setItem('userId', res.user._id);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', res.token);
        localStorage.setItem('fullName', `${res.user.firstName} ${res.user.lastName}`);

        this.router.navigateByUrl('/task-list');
      });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
