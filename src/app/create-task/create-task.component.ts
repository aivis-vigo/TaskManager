import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Task} from "../task";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
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
  @Output() addTaskEvent: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(private fb: FormBuilder) {
  }

  onSubmit(): void {
    this.addTaskEvent.emit(this.currentTask.value);
    this.currentTask.reset();
  }

  get title() {
    return this.currentTask.get('title');
  }

  get description() {
    return this.currentTask.get('description');
  }

  get type() {
    return this.currentTask.get('description');
  }

  get status() {
    return this.currentTask.get('description');
  }

  get createdOn() {
    return this.currentTask.get('description');
  }
}
