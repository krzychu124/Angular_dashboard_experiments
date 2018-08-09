import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableService } from './table.service';
import { RestService } from './rest.service';
import { DataService } from './data.service';
import { ComponentFactoryService } from './component-factory.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [
    TableService, RestService, DataService, ComponentFactoryService
  ],
  exports: []
})
export class CommonServicesModule { }
