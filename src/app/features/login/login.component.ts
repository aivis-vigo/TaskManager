import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass} from "@angular/common";
import {Subject} from "rxjs";
import {TranslateDirective, TranslatePipe} from "@ngx-translate/core";
import {login} from "./login.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    TranslatePipe,
    TranslateDirective
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
    private store: Store
  ) {
  }

  onSubmit(): void {
    this.store.dispatch(login({credentials: this.credentials.value}));
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
