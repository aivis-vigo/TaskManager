import {Routes} from "@angular/router";
import {CreateTaskComponent} from "./create-task/create-task.component";
import {ErrorPageComponent} from "./error-page/error-page.component";

export const routes: Routes = [
  {path: 'create-task', title: 'TODO - Create', component: CreateTaskComponent},
  { path: '',   redirectTo: '/create-task', pathMatch: 'full' },
  {path: '**', title: 'TODO - Error', component: ErrorPageComponent}
];
