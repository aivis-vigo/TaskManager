import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TaskModel} from "../task.model";
import {NgClass} from "@angular/common";
import {InputValidatorComponent} from "../input-validator/input-validator.component";

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    InputValidatorComponent
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  @Output() addTaskEvent: EventEmitter<TaskModel> = new EventEmitter<TaskModel>();
  currentTask: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    type: ['', [Validators.required]],
    status: ['', [Validators.required]],
    createdOn: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {
  }

  onSubmit(): void {
    this.addTaskEvent.emit(this.currentTask.value);
    this.currentTask.reset();
  }

  get title(): AbstractControl {
    return <AbstractControl<string, string>>this.currentTask.get('title');
  }

  get description(): AbstractControl {
    return <AbstractControl<string, string>>this.currentTask.get('description');
  }

  get type(): AbstractControl {
    return <AbstractControl<string, string>>this.currentTask.get('type');
  }

  get status(): AbstractControl {
    return <AbstractControl<string, string>>this.currentTask.get('status');
  }

  get createdOn(): AbstractControl {
    return <AbstractControl<string, string>>this.currentTask.get('createdOn');
  }
}
