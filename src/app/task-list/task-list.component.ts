import {Component, OnInit} from '@angular/core';
import {Task} from "../task";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  FILE_PATH: string = '../../assets/dummy-tasks.json';

  async ngOnInit(): Promise<void> {
    try {
      await fetch(this.FILE_PATH)
        .then(res => {
          if (!res.ok) {
            throw new Error("Some unexpected network or file issues.");
          }
          return res.json();
        })
        .then(json => this.tasks = [...json.data.tasks]);
    } catch (error) {
      console.error("Something went wrong while loading task list: ", error);
    }
  }

  addTask(newTask: Task): void {
    this.tasks = [...this.tasks, newTask];
  }

  removeTask(taskId: number): void {
    this.tasks.splice(taskId, 1);
  }

  trackByIndex(index: number, task: Task): number {
    return index;
  }
}
