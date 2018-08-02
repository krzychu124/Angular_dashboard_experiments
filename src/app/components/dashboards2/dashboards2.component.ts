import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DashboardConfig } from '../../interfaces/dashboardConfig';
import { Dashboard } from '../../interfaces/dashboard';
import { Subject } from 'rxjs';
import { NgbTab, NgbTabContent } from '@ng-bootstrap/ng-bootstrap';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dashboards2',
  templateUrl: './dashboards2.component.html',
  styleUrls: ['./dashboards2.component.scss']
})
export class Dashboards2Component implements OnInit {
  @ViewChild('tpl') tpl: TemplateRef<any>;
  dashboards = [];
  sub: Subject<NgbTab>  = new Subject();
  index = 0;
  constructor() { }

  ngOnInit() {
    this.createDashboard();
  }

  createDashboard() {
    this.dashboards.push({ config: { rows: 25, cols: 30, showGrid: true } as DashboardConfig, name: 'Dash' + this.dashboards.length + 1 } as Dashboard)
  }
  addTab(val: any) {
    let tab =new NgbTab();
    tab.id = 'test'+ this.index++;
    tab.title = val ||'title';
    tab.contentTpl = new NgbTabContent(this.tpl);
    this.sub.next(tab);
  }
}
