import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TaskModel} from "../../shared/task.model";
import {NgClass} from "@angular/common";
import {InputValidatorComponent} from "../input-validator/input-validator.component";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    InputValidatorComponent,
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent {
  currentTask: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    type: ['', [Validators.required]],
    status: ['', [Validators.required]],
    createdOn: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private taskService: TaskService) {
  }

  onSubmit(): void {
    this.taskService.addTask(this.currentTask.value);
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
