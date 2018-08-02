import { Component, OnInit, Renderer2, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Dashboard } from '../../interfaces/dashboard';
import { DashboardConfig } from '../../interfaces/dashboardConfig';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit, AfterViewInit {
  @ViewChild('buttonAdd',{ read: ViewContainerRef}) buttonAdd: ViewContainerRef;
  dashboards = [];
  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.createDashboard();
  }
  ngAfterViewInit() {
    setTimeout(() => {
    this.renderer.addClass(this.buttonAdd.element.nativeElement, 'add-button');
    }, 500);
  }

  trackByFn(item, index) {
    return item.id;
  }
  createDashboard() {
    this.dashboards.push({config: {rows: 25, cols: 30, showGrid: true}as DashboardConfig, name: 'Dash'+ this.dashboards.length +1}as Dashboard)
  }
  toggleDashboardEdit($event) {

  }
}
