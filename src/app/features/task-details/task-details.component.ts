import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TaskModel} from "../../shared/models/task.model";
import {TaskService} from "../../services/task.service";
import {Observable, Subject, takeUntil} from "rxjs";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputValidatorComponent} from "../input-validator/input-validator.component";
import {AsyncPipe, NgClass} from "@angular/common";
import {UserService} from "../../services/user.service";
import {UserModel} from "../../shared/models/user.model";
import {FormSubmitButtonComponent} from "../form-submit-button/form-submit-button.component";

@Component({
  selector: 'app-task-details',
  standalone: true,
    imports: [
        InputValidatorComponent,
        ReactiveFormsModule,
        NgClass,
        AsyncPipe,
        FormSubmitButtonComponent
    ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  currentTask: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    type: ['', [Validators.required]],
    status: ['', [Validators.required]],
    assignedTo: ['', [Validators.required]],
  });
  task: TaskModel = <TaskModel>{};
  private destroy: Subject<void> = new Subject();
  errorMessage: string = '';
  editMode: boolean = false;

  constructor(
    protected userService: UserService,
    private fb: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const taskId: string | null = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      const fetchedTask: Observable<TaskModel> = this.taskService.getTask(taskId);
      if (fetchedTask) {
        fetchedTask
          .pipe(takeUntil(this.destroy))
          .subscribe((res: TaskModel) => {
            this.task = res;
            this.currentTask.setValue({
              title: this.task.title,
              description: this.task.description,
              type: this.task.type,
              status: this.task.status,
              assignedTo: this.task.assignedTo,
            });
          });
      } else {
        this.errorMessage = `Failed to fetch task with id: ${taskId}`;
      }
    }

    this.userService.loadInitialUsers()
      .pipe(takeUntil(this.destroy))
      .subscribe((res: UserModel[]) => this.userService.userSubject.next(res));
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  onUpdate(): void {
    this.taskService.updateTask(this.task._id, this.currentTask.value)
      .pipe(takeUntil(this.destroy))
      .subscribe((res: TaskModel) => {
        this.task = res;
        this.toggleEditMode();
      });
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

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
