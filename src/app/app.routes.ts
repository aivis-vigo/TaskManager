import {Routes} from "@angular/router";
import {CreateTaskComponent} from "./features/create-task/create-task.component";
import {ErrorPageComponent} from "./features/error-page/error-page.component";
import {TaskListComponent} from "./features/task-list/task-list.component";

export const routes: Routes = [
  {path: 'create-task', title: 'TODO - Create', component: CreateTaskComponent},
  {path: 'task-list', title: 'TODO - List', component: TaskListComponent},
  { path: '',   redirectTo: '/create-task', pathMatch: 'full' },
  {path: '**', title: 'TODO - Error', component: ErrorPageComponent}
];
