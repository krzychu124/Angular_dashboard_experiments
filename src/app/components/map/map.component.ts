import { Component, OnInit, AfterViewInit, AfterContentInit, OnDestroy, AfterViewChecked } from '@angular/core';
import Map from 'ol/map';
import XYZ from 'ol/source/xyz';
import TileLayer from 'ol/layer/tile';
import View from 'ol/view';
import Proj from 'ol/proj';
import { Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy, AfterContentInit {
  @Input() parentSubject: Subject<any>;
  map: Map;
  source: XYZ;
  layer: TileLayer;
  view: View;
  @Input() id = 'map';
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.parentSubject.subscribe(event => {
      if (this.map) {
        this.map.updateSize();
      }
    });
    this.source = new XYZ({
      // Tiles from Mapbox (Light)
      url: 'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
    });
    this.layer = new TileLayer({
      source: this.source
    });
    this.view = new View({
      center: Proj.fromLonLat([6.661594, 50.433237]),
      zoom: 3,
    });
    console.log('i call');
  }
  init() {
    this.map = new Map({
      target: this.id,
      layers: [this.layer],
      view: this.view
    });
    console.log('in call');
  }
  ngAfterContentInit() {
    setTimeout(() => {
      this.init();
    }, 500);
  }
  ngOnDestroy() {
    console.log('destroyed');
    if (this.parentSubject.source) {
      this.parentSubject.unsubscribe();
    } else {
      console.log('no source');
    }
  }
}
