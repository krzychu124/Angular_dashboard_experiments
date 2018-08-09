import { Component, OnInit, AfterViewInit } from '@angular/core';
import { WidgetType } from '../../model/widget-type.enum';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dash3',
  templateUrl: './dash3.component.html',
  styleUrls: ['./dash3.component.scss']
})
export class Dash3Component implements OnInit, AfterViewInit {
tabs: any[];
type = WidgetType.TABLE;
subject = new Subject<void>();
  constructor() { }

  ngOnInit() { 
    this.tabs = [];
    this.tabs.push('tab 1');
    this.tabs.push('tab 2');
    this.tabs.push('tab 3');
    this.tabs.push('tab 4');
  }
ngAfterViewInit() {
  this.type = WidgetType.TABLE;
}
}
