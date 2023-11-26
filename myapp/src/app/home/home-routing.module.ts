import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'app1',
        loadChildren: () =>
          loadRemoteModule({
            type: 'manifest',
            remoteName: 'app1',
            exposedModule: './App1Module',
          }).then((m) => m.App1Module),
      },
      {
        path: 'app2',
        loadChildren: () =>
          loadRemoteModule({
            type: 'manifest',
            remoteName: 'app2',
            exposedModule: './App2Module',
          }).then((m) => m.App2Module),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
