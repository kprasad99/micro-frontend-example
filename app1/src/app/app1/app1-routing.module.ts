import { RouterModule, Routes } from '@angular/router';
import { App1Component } from './app1.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: App1Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class App1RoutingModule {}
