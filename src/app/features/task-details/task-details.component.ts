import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TaskModel} from "../../shared/task.model";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit {
  task: TaskModel = <TaskModel>{};

  constructor(private taskService: TaskService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.task = this.taskService.getTask(taskId);
  }
}
