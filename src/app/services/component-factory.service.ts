import { Injectable } from '@angular/core';
import { WidgetBase } from '../model/widget-base';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentFactoryService<C extends WidgetBase> {

constructor() { }

 build<C>(): Observable<C>{
  return ;
 }
}
