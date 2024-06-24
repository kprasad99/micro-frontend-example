import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ReactWrapperComponent } from '../react-wrapper/react-wrapper.component';

@NgModule({
  declarations: [HomeComponent, ReactWrapperComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatRippleModule,
    HomeRoutingModule,
  ],
})
export class HomeModule {}
