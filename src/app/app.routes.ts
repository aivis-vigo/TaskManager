import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: 'create-task',
    title: 'TODO - Create',
    loadComponent: () => import('./features/create-task/create-task.component').then(c => c.CreateTaskComponent)
  },
  {
    path: 'task-list',
    title: 'TODO - List',
    loadComponent: () => import('./features/task-list/task-list.component').then(c => c.TaskListComponent)
  },
  {
    path: 'task-list/:id',
    title: 'TODO - List',
    loadComponent: () => import('./features/task-details/task-details.component').then(c => c.TaskDetailsComponent)
  },
  {path: '', redirectTo: '/create-task', pathMatch: 'full'},
  {
    path: '**',
    title: 'TODO - Error',
    loadComponent: () => import('./features/error-page/error-page.component').then(c => c.ErrorPageComponent)
  }
];
