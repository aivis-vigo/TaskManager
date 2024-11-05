import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subject, takeUntil} from "rxjs";
import {TaskModel} from "../../shared/task.model";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputValidatorComponent} from "../input-validator/input-validator.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [
    FormsModule,
    InputValidatorComponent,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent implements OnInit, OnDestroy {
  currentTask: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    type: ['', [Validators.required]],
    status: ['', [Validators.required]],
  });
  task: TaskModel = <TaskModel>{};
  private destroy: Subject<void> = new Subject();
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private taskService: TaskService, private route: ActivatedRoute, private router: Router) {
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
            })
          });
      }
    } else {
      this.errorMessage = `Failed to fetch task with id: ${taskId}`;
    }
  }

  onUpdate() {
    this.taskService.updateTask(this.task._id, this.currentTask.value)
      .pipe(takeUntil(this.destroy))
      .subscribe((res: TaskModel) => {
        this.router.navigate(['/task-list', res._id]);
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
