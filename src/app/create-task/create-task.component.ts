import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Output, EventEmitter} from '@angular/core';
import {Task} from "../task";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  currentTask: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    type: ['', Validators.required],
    createdOn: ['', Validators.required],
    status: ['', Validators.required],
  });
  @Output() addTaskEvent: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(private fb: FormBuilder) {}

  onSubmit(): void {
    this.addTaskEvent.emit(this.currentTask.value);
    this.currentTask.reset();
  }
}
