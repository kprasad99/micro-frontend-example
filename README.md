

#

. Create 3 projects.
```
$ ng new myapp --routing --prefix k
$ ng new app1 --routing --prefix k1
$ ng new app2 --routing --prefix k2
```

. Install `@angular/material` on each apps on all projects.
```
ng add @angular/material
```

. Install `@angular/pwa` on each apps on all projects.
```
ng add @angular/pwa
```
. Install `@angular-eslint/schematics` on all apps.
```
ng add @angular-eslint/schematics
```
. Add `@angular/flex-layout` on all apps
```
pnpm install @angular/flex-layout
```

. Generate home module on all apps.
```
ng g m home --routing
```
. Generate home module on each apps.
```
ng g c home -m home
```
. Remove `app.component.html`, `app.component.scss` from each apps and replace `templateUrl` and `styleUrl` with as below.
```
- templateUrl: './app.component.html',
- styleUrl: './app.component.scss'
+ template: `<router-outlet></router-outlet>`
```

. In `apps.routes.ts` add routing information as shown below.
```
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'prefix',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];

```

. In `home-routing.module.ts` of each ms add following.
```
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}

```
. Add additional meterial related modules to `home.module.ts` on each apps.
```
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, FlexLayoutModule, MatToolbarModule, MatRippleModule, HomeRoutingModule]
})
export class HomeModule {}

```

. Update `home.component.html` page to have header, footer and router outlet. change the header name to `MYAPP`, `APP1` and `APP2` for respective apps.
```
<div fxLayout="column" fxFlexFill>
  <div fxFlex="none">
    <mat-toolbar color="primary">
      <span>APP1</span>
    </mat-toolbar>
  </div>
  <div fxFlex>
    <div style="padding: 8px"><router-outlet></router-outlet></div>
  </div>
  <div fxFlex="none">
    <mat-toolbar color="primary">
      <div fxLayout="row" fxLayoutAlign="center center" fxLayoutGap="10px" style="width: 100%">
        Allrights Reserved &#64; KP 2023
      </div>
    </mat-toolbar>
  </div>
</div>

```
. Remove `standalone: true` and `imports` from `home.component.ts`

. Update `styles.scss` with following configuration for flexbox to work.
```
html,
body {
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  font-family: Roboto, 'Helvetica Neue', sans-serif;
}
```
. In `app1`, perform following tasks.
.. Add `app1` module.
```
ng g m app1 --routing
```
.. Add `app1` component.
```
ng g c app1 -m app1
```
.. Update `home-routing.module.ts`. as shown below.
```
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../app1/app1.module').then(m => m.App1Module)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}

```

.. Change `app1-routing.module.ts` as shown below.
```
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

```
.. Update `app1.component.html` as shown below.
```
<div fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="4px" style="height: 100%; width: 100%">
  <p><b style="font-size: large">app1 works!</b></p>
</div>
```
.. Remove `standalone: true` and `imports` from `app1.component.ts`
.. Update `app1.module.ts` as shown below.
```
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';

import { App1Component } from './app1.component';
import { App1RoutingModule } from './app1-routing.module';

@NgModule({
  declarations: [App1Component],
  imports: [CommonModule, FlexLayoutModule, App1RoutingModule]
})
export class App1Module {}
```
. Repeat the last step for `app2` application as well.
.. Add `app2` module.
```
ng g m app2 --routing
```
.. Add `app2` component.
```
ng g c app2 -m app2
```
.. Update `home-routing.module.ts`. as shown below.
```
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../app2/app2.module').then(m => m.App2Module)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}

```

.. Change `app2-routing.module.ts` as shown below.
```
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


```
.. Update `app2.component.html` as shown below.
```
<div fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="4px" style="height: 100%; width: 100%">
  <p><b style="font-size: large">app2 works!</b></p>
</div>
```
.. Remove `standalone: true` and `imports` from `app2.component.ts`
.. Update `app2.module.ts` as shown below.
```
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';

import { App2Component } from './app2.component';
import { App2RoutingModule } from './app2-routing.module';

@NgModule({
  declarations: [App2Component],
  imports: [CommonModule, FlexLayoutModule, App2RoutingModule]
})
export class App2Module {}

```
. Now start each app using below command and access from browser and verify all apps are working.
```
// myapp
ng serve
// app1
ng serve --port 4201
// app2
ng serve --port 4202
```
