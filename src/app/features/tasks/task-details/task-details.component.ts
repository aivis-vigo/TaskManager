import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TaskModel} from "../../../shared/models/task.model";
import {Observable, Subject, takeUntil} from "rxjs";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputValidatorComponent} from "../../shared/input-validator/input-validator.component";
import {AsyncPipe, NgClass} from "@angular/common";
import {UserModel} from "../../../shared/models/user.model";
import {FormSubmitButtonComponent} from "../../shared/form-submit-button/form-submit-button.component";
import {TranslateDirective, TranslatePipe} from "@ngx-translate/core";
import {Store} from "@ngrx/store";
import {AppState} from "../../../shared/models/state.model";
import {selectOpenedTask} from "../../../shared/selectors/list.selectors";
import {updateTask} from "../../../shared/actions/list.actions";
import {loadInitialUsers} from "../../../shared/actions/user.actions";
import {selectUserList} from "../../../shared/selectors/user.selectors";
import {UserStore} from "../../../shared/user.store";

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    InputValidatorComponent,
    ReactiveFormsModule,
    NgClass,
    AsyncPipe,
    FormSubmitButtonComponent,
    TranslatePipe,
    TranslateDirective
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  readonly userStore = inject(UserStore);
  private destroy: Subject<void> = new Subject();
  userList$: Observable<UserModel[]> = this.store.select(selectUserList);
  currentTask: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    type: ['', [Validators.required]],
    status: ['', [Validators.required]],
    assignedTo: ['', [Validators.required]],
  });
  task: TaskModel = <TaskModel>{};
  errorMessage: string = '';
  editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    const taskId: string | null = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.store.select(selectOpenedTask)
        .pipe(takeUntil(this.destroy))
        .subscribe((openedTask: TaskModel) => {
          this.task = openedTask;
          this.currentTask.setValue({
            title: openedTask.title,
            description: openedTask.description,
            type: openedTask.type,
            status: openedTask.status,
            assignedTo: openedTask.assignedTo,
          });
        });
    }
    this.store.dispatch(loadInitialUsers());
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  onUpdate(): void {
    this.store.dispatch(updateTask({taskId: this.task._id, task: this.currentTask.value}));
    this.toggleEditMode();
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

    ngOnDestroy(): void {
      this.destroy.next();
      this.destroy.complete();
    }
}
