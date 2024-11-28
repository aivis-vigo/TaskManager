import {Routes} from "@angular/router";
import {authGuard} from "./shared/guards/auth.guard";
import {adminGuard} from "./shared/guards/admin.guard";

export const routes: Routes = [
  {
    path: 'create-task',
    title: 'TODO - Create',
    canActivate: [authGuard],
    loadComponent: () => import('./features/tasks/create-task/create-task.component').then(c => c.CreateTaskComponent)
  },
  {
    path: 'task-list',
    title: 'TODO - List',
    canActivate: [authGuard],
    loadComponent: () => import('./features/tasks/task-list/task-list.component').then(c => c.TaskListComponent)
  },
  {
    path: 'task-list/:id',
    title: 'TODO - Details',
    canActivate: [authGuard],
    loadComponent: () => import('./features/tasks/task-details/task-details.component').then(c => c.TaskDetailsComponent)
  },
  {
    path: 'login',
    title: 'TODO - Login',
    canActivate: [authGuard],
    loadComponent: () => import('./features/authentication/login/login.component').then(c => c.LoginComponent)
  },
  {
    path: 'register',
    title: 'TODO - Register',
    canActivate: [authGuard],
    loadComponent: () => import('./features/authentication/registration/registration.component').then(c => c.RegistrationComponent)
  },
  {
    path: 'user-list',
    title: 'TODO - User List',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/users/user-list/user-list.component').then(c => c.UserListComponent)
  },
  {
    path: 'user-list/:id',
    title: 'TODO - User Details',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/users/user-details/user-details.component').then(c => c.UserDetailsComponent)
  },
  {
    path: 'user-group',
    title: 'TODO - Create User Group',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/users/group/user-group/user-group.component').then(c => c.UserGroupComponent)
  },
  {
    path: 'group-list',
    title: 'TODO - Group List',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/users/group/group-list/group-list.component').then(c => c.GroupListComponent)
  },
  {
    path: 'group-list/:id',
    title: 'TODO - Group Details',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/users/group/group-details/group-details.component').then(c => c.GroupDetailsComponent)
  },
  {path: '', redirectTo: '/create-task', pathMatch: 'full'},
  {
    path: '**',
    title: 'TODO - Error',
    loadComponent: () => import('./features/shared/error-page/error-page.component').then(c => c.ErrorPageComponent)
  }
];
