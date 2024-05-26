import { ROUTES, Route, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { HomeComponent } from './home.component';
import { HttpClient } from '@angular/common/http';

// const routes: Routes = [
//   {
//     path: '',
//     component: HomeComponent,
//     children: [
//       {
//         path: 'app1',
//         loadChildren: () =>
//           loadRemoteModule({
//             type: 'manifest',
//             remoteName: 'app1',
//             exposedModule: './App1Module',
//           }).then((m) => m.App1Module),
//       },
//       {
//         path: 'app2',
//         loadChildren: () =>
//           loadRemoteModule({
//             type: 'manifest',
//             remoteName: 'app2',
//             exposedModule: './App2Module',
//           }).then((m) => m.App2Module),
//       },
//     ],
//   },
// ];

@NgModule({
  imports: [RouterModule],
  exports: [RouterModule],
  providers: [
    {
      provide: ROUTES,
      useFactory: (http: HttpClient) => {
        const routes: Routes = [];
        const homePath: Route = {
          path: '',
          component: HomeComponent,
        };
        // use APP_INITIALIZER to get data from http endpoint/service discovery
        const apps = [
          { name: 'app1', module: 'App1Module' },
          { name: 'app2', module: 'App2Module' },
        ];
        for (const app of apps) {
          if (homePath.children) {
            homePath.children.push({
              path: app.name,
              loadChildren: () =>
                loadRemoteModule({
                  type: 'manifest',
                  remoteName: app.name,
                  exposedModule: `./${app.module}`,
                }).then((m) => m[app.module]),
            });
          } else {
            homePath.children = [
              {
                path: app.name,
                loadChildren: () =>
                  loadRemoteModule({
                    type: 'manifest',
                    remoteName: app.name,
                    exposedModule: `./${app.module}`,
                  }).then((m) => m[app.module]),
              },
            ];
          }
        }
        routes.push(homePath);
        return [
          ...routes,
          // ..additionalRoutes
        ];
      },
      multi: true,
    },
  ],
})
export class HomeRoutingModule {}
