import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TaskModel} from "../../shared/task.model";
import {TaskService} from "../../services/task.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit {
  task: TaskModel = <TaskModel>{};
  errorMessage: string = '';

  constructor(private taskService: TaskService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const taskId: number = Number(this.route.snapshot.paramMap.get('id'));
    const fetchedTask: Observable<TaskModel> = this.taskService.getTask(taskId);
    if (fetchedTask) {
      fetchedTask.subscribe((res: TaskModel) => this.task = res);
    } else {
      this.errorMessage = `Failed to fetch task with id: ${taskId}`;
    }
  }
}
