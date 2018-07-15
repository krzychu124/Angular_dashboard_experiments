import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { StartScreenComponent } from './components/start-screen/start-screen.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { MapComponent } from './components/map/map.component';
import { BasicTableComponent } from './components/basic-table/basic-table.component';
import { LayersSelectorComponent } from './components/layers-selector/layers-selector.component';
import { NgxWidgetGridModule, NgxWidgetComponent } from 'ngx-widget-grid';
import { CommonModule } from '@angular/common';

@NgModule({
   declarations: [
      AppComponent,
      StartScreenComponent,
      MainDashboardComponent,
      MapComponent,
      BasicTableComponent,
      LayersSelectorComponent
   ],
   imports: [
      BrowserModule,
      AppRoutes,
      CommonModule,
      BrowserAnimationsModule,
      MaterialModule,
      NgxWidgetGridModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
       BasicTableComponent,
       NgxWidgetComponent
   ]
})
export class AppModule { }
