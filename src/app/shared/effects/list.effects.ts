import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {TaskService} from "../../services/task.service";
import {Router} from "@angular/router";
import * as TaskListActions from "../actions/list.actions";
import {catchError, EMPTY, map, mergeMap, tap} from "rxjs";
import {TaskModel} from "../models/task.model";

@Injectable()
export class TaskListEffects {

  loadTasks$ = createEffect(() => this.actions$.pipe(
      ofType(TaskListActions.viewAll),
      mergeMap(() => this.taskService.loadInitialTasks().pipe(
          map((taskList: TaskModel[]) => TaskListActions.viewSuccess({tasks: taskList})),
          catchError(() => EMPTY)
        )
      )
    )
  );

  loadTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskListActions.viewOne),
    mergeMap(({taskId}) => this.taskService.getTask(taskId).pipe(
      map((currentTask: TaskModel) => TaskListActions.viewOneSuccess({task: currentTask})),
      catchError(() => EMPTY)
    ))
  ));

  loadTaskSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(TaskListActions.viewOneSuccess),
      tap(({task}) => {
        this.router.navigate(['/task-list', task._id]);
        return task;
      })
    ),
    {dispatch: false}
  );

  createTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskListActions.createTask),
    mergeMap(({task}) => this.taskService.addTask(task).pipe(
      map((newTask: TaskModel) => TaskListActions.createTaskSuccess({task: newTask})),
      catchError(() => EMPTY)
    ))
  ));

  updateTask$ = createEffect(() => this.actions$.pipe(
      ofType(TaskListActions.updateTask),
      mergeMap(({taskId, task}) => this.taskService.updateTask(taskId, task).pipe(
        map((task: TaskModel) => TaskListActions.updateTaskSuccess({updatedTask: task})),
        catchError(() => EMPTY)
      ))
    )
  );

  deleteTask$ = createEffect(() => this.actions$.pipe(
    ofType(TaskListActions.deleteTask),
    mergeMap(({taskId}) => this.taskService.removeTask(taskId).pipe(
      map((taskList: TaskModel[]) => TaskListActions.deleteTaskSuccess({taskList: taskList})),
      catchError(() => EMPTY)
    ))
  ));

  constructor(
    private actions$: Actions,
    private taskService: TaskService,
    private router: Router,
  ) {
  }
}
