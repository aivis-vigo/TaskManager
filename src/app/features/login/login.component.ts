import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {UserService} from "../../services/user.service";
import {Subject, takeUntil} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthorizedUserModel} from "../../shared/models/authorized-user.model";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  credentials: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  private destroy: Subject<void> = new Subject();
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
  }

  onSubmit(): void {
    this.userService.login(this.credentials.value)
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (res: AuthorizedUserModel) => {
          localStorage.setItem('userId', res.user._id);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', res.token);
          localStorage.setItem('fullName', `${res.user.firstName} ${res.user.lastName}`);

          this.userService.currentUserSig.set(res.user);

          this.router.navigateByUrl('/task-list') ;
        },
        error: (res: HttpErrorResponse) => this.errorMessage = res.error.message
      });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
