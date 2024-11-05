import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TaskModel} from "../../shared/task.model";
import {TaskService} from "../../services/task.service";
import {Observable, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss'
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  task: TaskModel = <TaskModel>{};
  errorMessage: string = '';
  private ngUnsubscribe: Subject<void> = new Subject();

  constructor(private taskService: TaskService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const taskId: string | null = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      const fetchedTask: Observable<TaskModel> = this.taskService.getTask(taskId);
      if (fetchedTask) {
        fetchedTask
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe((res: TaskModel) => this.task = res);
      } else {
        this.errorMessage = `Failed to fetch task with id: ${taskId}`;
      }
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
