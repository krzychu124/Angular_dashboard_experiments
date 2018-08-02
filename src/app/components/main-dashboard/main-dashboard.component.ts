import { Component, OnInit, Renderer2, Injector, ComponentFactoryResolver, ComponentFactory, ViewContainerRef, ViewChild, ReflectiveInjector } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subject } from 'rxjs';
import { BasicTableComponent } from '../basic-table/basic-table.component';
import { NgxWidgetComponent, Rectangle, NgxWidgetGridComponent } from 'ngx-widget-grid';
import { ChangeDetectorRef } from '@angular/core';
import { WidgedSettings } from '../../interfaces/widged-settings';
import { TableService } from '../../services/table.service';
import { PeriodicElement } from 'src/app/interfaces/periodic-element';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { layer } from 'openlayers';
import { LayersSelectorComponent, Layer } from '../layers-selector/layers-selector.component';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {
  @ViewChild('grid', { read: ViewContainerRef }) gridComponent: ViewContainerRef;
  @ViewChild('m2', { read: ViewContainerRef })
  set m2(container) {
    if (this._m2 !== container) {
      console.log(container);
      this._m2 = container;
    }
  }
  @ViewChild('lsel')
  set lsel(container: LayersSelectorComponent) {
    if (this._lsel !== container) {
      if (this._lsel !== undefined && !container) {
        this._lsel.layerStateChanged.unsubscribe();
      }
      this._lsel = container;
      if (this._lsel) {
        this._lsel.layerStateChanged.subscribe(next => this.updateLayerVisibility(next));
      }
    }
  }
  _lsel: LayersSelectorComponent;
  _m2: ViewContainerRef;
  tabs = [{ id: 0, title: 'tab1', n: 'm1', content: 'something' }, { id: 1, title: 'tab2', n: 'm2', content: 'map' }, { id: 2, title: 'tab3', n: 'm3', content: 'something' }];
  appTitle = 'Dashboard experiments';
  movable = false;
  resizable = false;
  pos = {
    bottom: 18,
    height: 17,
    left: 2,
    right: 15,
    top: 2,
    width: 14
  };
  target = null;
  parensSubject: Subject<any> = new Subject();
  sub = new Subject();
  sub2 = new Subject();
  widgets: Array<WidgedSettings> = [];

  constructor(private dataService: DataService, private renderer: Renderer2,
    private cd: ChangeDetectorRef, private injector: Injector,
    private compRslv: ComponentFactoryResolver) { }

  ngOnInit() {
    this.sub.subscribe(l => console.log(l));

    this.widgets = [
      this.dataService.getWidgets(0),
      //  this.dataService.getWidgets(1), 
      this.dataService.getWidgets(1),
      //  this.dataService.getWidgets(3),
      this.dataService.getWidgets(2),
      //  this.dataService.getWidgets(5),
      //  this.dataService.getWidgets(6)
    ];
  }

  createMap(map) {
    console.log(map);
    map.init();
  }
  tabChange(v1, v2) {
    console.log(v1, v2);
  }
  toggleEdit($event: MouseEvent) {
    $event.stopPropagation();
    $event.preventDefault();
    this.movable = !this.movable;
    this.resizable = !this.resizable;
    this.parensSubject.next('changed');
  }
  click($event: MouseEvent) {
    // console.log($event);
    $event.preventDefault();
    $event.stopPropagation();
    this.target = $event.target;
    const table = this.compRslv.resolveComponentFactory(BasicTableComponent);
    const t = this.gridComponent.createComponent(table);
    const n = new NgxWidgetComponent(t.location);
    console.log(n);
    const ngWidget = this.compRslv.resolveComponentFactory(NgxWidgetComponent);
    const prov = ReflectiveInjector.resolve([NgxWidgetGridComponent]);
    console.log('grid---', this.gridComponent);

    const injector = ReflectiveInjector.fromResolvedProviders(prov, this.gridComponent.parentInjector);
    const ww = ngWidget.create(injector);
    ww.instance.movable = true;
    this.renderer.appendChild(ww.location.nativeElement, t.location.nativeElement);
    // ww.instance.resizable = true;
    console.log(ww);

    this.cd.detectChanges();
  }
  trackByFn(item, index) {
    return item.id;
  }
  lChanged($event) {
    this.sub.next($event);
  }
  updateLayerVisibility(l: Layer) {
    console.log('test');
  }
}
