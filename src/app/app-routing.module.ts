import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      canceledNavigationResolution: 'replace',
      paramsInheritanceStrategy: 'always',
      urlUpdateStrategy: 'deferred'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
