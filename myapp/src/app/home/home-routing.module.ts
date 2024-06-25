import { ROUTES, Route, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { HomeComponent } from './home.component';
import { ReactWrapperComponent } from '../react-wrapper/react-wrapper.component';
import { RemoteModuleInfoService } from '../remote-module-info.service';

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
      useFactory: (remoteInitService: RemoteModuleInfoService) => {
        const routes: Routes = [];
        const homePath: Route = {
          path: '',
          component: HomeComponent,
        };
        for (const key in remoteInitService.remoteModuleInfo) {
          const app = remoteInitService.remoteModuleInfo[key];
          if (homePath.children) {
            if (app.appType === 'angular') {
              homePath.children.push({
                path: app.path,
                loadChildren: () =>
                  loadRemoteModule(app).then((m) => m[app.moduleName]),
              });
            } else {
              homePath.children.push({
                path: app.path,
                component: ReactWrapperComponent,
                data: { appInfo: app },
              });
            }
          } else {
            if (app.appType === 'angular') {
              homePath.children = [
                {
                  path: app.path,
                  loadChildren: () =>
                    loadRemoteModule(app).then((m) => m[app.moduleName]),
                },
              ];
            } else {
              homePath.children = [
                {
                  path: app.path,
                  component: ReactWrapperComponent,
                  data: { appInfo: app },
                },
              ];
            }
          }
        }
        routes.push(homePath);
        return [
          ...routes,
          // ..additionalRoutes
        ];
      },
      deps: [RemoteModuleInfoService],
      multi: true,
    },
  ],
})
export class HomeRoutingModule {}
