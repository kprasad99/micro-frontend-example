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
