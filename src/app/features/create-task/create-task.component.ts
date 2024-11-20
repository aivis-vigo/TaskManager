import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AsyncPipe, NgClass} from "@angular/common";
import {InputValidatorComponent} from "../input-validator/input-validator.component";
import {TaskService} from "../../services/task.service";
import {Subject, takeUntil} from "rxjs";
import {UserService} from "../../services/user.service";
import {UserModel} from "../../shared/models/user.model";
import {FormSubmitButtonComponent} from "../form-submit-button/form-submit-button.component";
import {TranslateDirective, TranslatePipe} from "@ngx-translate/core";
import {LanguageService} from "../../services/language.service";

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
export class CreateTaskComponent implements OnDestroy {
  currentTask: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    type: ['', [Validators.required]],
    status: ['', [Validators.required]],
    createdOn: ['', [Validators.required]],
    assignedTo: ['Unassigned', [Validators.required]],
  });
  private destroy: Subject<void> = new Subject();

  constructor(
    protected userService: UserService,
    private fb: FormBuilder,
    private taskService: TaskService,
  ) {
    userService.loadInitialUsers()
      .pipe(takeUntil(this.destroy))
      .subscribe((res: UserModel[]) => {
        userService.userSubject.next(res);
      });
  }

  onSubmit(): void {
    this.taskService.addTask(this.currentTask.value)
      .pipe(takeUntil(this.destroy))
      .subscribe();
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

  get assignedTo() {
    return this.currentTask.get('assignedTo');
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
