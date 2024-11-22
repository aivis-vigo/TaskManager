import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe, NgClass} from "@angular/common";
import {InputValidatorComponent} from "../input-validator/input-validator.component";
import {Observable} from "rxjs";
import {UserModel} from "../../shared/models/user.model";
import {FormSubmitButtonComponent} from "../form-submit-button/form-submit-button.component";
import {TranslateDirective, TranslatePipe} from "@ngx-translate/core";
import {Store} from "@ngrx/store";
import {AppState} from "../../shared/models/state.model";
import {loadInitialUsers} from "../../shared/actions/user.actions";
import {selectUserList} from "../../shared/selectors/user.selectors";
import {createTask} from "../../shared/actions/list.actions";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    InputValidatorComponent,
    AsyncPipe,
    FormSubmitButtonComponent,
    TranslatePipe,
    TranslateDirective
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  userList$: Observable<UserModel[]> = this.store.select(selectUserList);
  currentTask: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    type: ['', [Validators.required]],
    status: ['', [Validators.required]],
    createdOn: ['', [Validators.required]],
    assignedTo: ['Unassigned', [Validators.required]],
  });

  constructor(
    protected userService: UserService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.store.dispatch(loadInitialUsers());
  }

  onSubmit(): void {
    this.store.dispatch(createTask({task: this.currentTask.value}));
    this.currentTask.reset();
  }

  get title() {
    return this.currentTask.get('title');
  }

  get description() {
    return this.currentTask.get('description');
  }

  get type() {
    return this.currentTask.get('type');
  }

  get status() {
    return this.currentTask.get('status');
  }

  get createdOn() {
    return this.currentTask.get('createdOn');
  }
}
