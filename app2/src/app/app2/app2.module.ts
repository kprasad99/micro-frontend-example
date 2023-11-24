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
