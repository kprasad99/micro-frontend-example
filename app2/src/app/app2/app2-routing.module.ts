import { RouterModule, Routes } from '@angular/router';
import { App2Component } from './app2.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: App2Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class App2RoutingModule {}
