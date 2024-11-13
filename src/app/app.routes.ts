import {Routes} from "@angular/router";
import {authGuard} from "./shared/auth.guard";

export const routes: Routes = [
  {
    path: 'create-task',
    title: 'TODO - Create',
    canActivate: [authGuard],
    loadComponent: () => import('./features/create-task/create-task.component').then(c => c.CreateTaskComponent)
  },
  {
    path: 'task-list',
    title: 'TODO - List',
    canActivate: [authGuard],
    loadComponent: () => import('./features/task-list/task-list.component').then(c => c.TaskListComponent)
  },
  {
    path: 'task-list/:id',
    title: 'TODO - Details',
    canActivate: [authGuard],
    loadComponent: () => import('./features/task-details/task-details.component').then(c => c.TaskDetailsComponent)
  },
  {
    path: 'login',
    title: 'TODO - Login',
    canActivate: [authGuard],
    loadComponent: () => import('./features/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'register',
    title: 'TODO - Register',
    canActivate: [authGuard],
    loadComponent: () => import('./features/registration/registration.component').then(c => c.RegistrationComponent)
  },
  {path: '', redirectTo: '/create-task', pathMatch: 'full'},
  {
    path: '**',
    title: 'TODO - Error',
    loadComponent: () => import('./features/error-page/error-page.component').then(c => c.ErrorPageComponent)
  }
];
