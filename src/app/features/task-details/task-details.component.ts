import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskModel} from "../../shared/task.model";
import {TaskService} from "../../services/task.service";
import {Observable, Subject, takeUntil} from "rxjs";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputValidatorComponent} from "../input-validator/input-validator.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    InputValidatorComponent,
    ReactiveFormsModule,
    NgClass
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
  });
  task: TaskModel = <TaskModel>{};
  private destroy: Subject<void> = new Subject();
  errorMessage: string = '';
  editMode: boolean = false;

  constructor(private fb: FormBuilder, private taskService: TaskService, private route: ActivatedRoute) {
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
            });
          });
      } else {
        this.errorMessage = `Failed to fetch task with id: ${taskId}`;
      }
    }
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

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
