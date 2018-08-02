import { Component, OnInit, AfterViewInit, AfterContentInit, OnDestroy, AfterViewChecked } from '@angular/core';
import Map from 'ol/map';
import XYZ from 'ol/source/xyz';
import TileLayer from 'ol/layer/tile';
import View from 'ol/view';
import Proj from 'ol/proj';
import { Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Subject } from 'rxjs';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import Circle from 'ol/style/circle';
import Fill from 'ol/style/fill';
import WFS from 'ol/format/wfs';
import loadingstrategy from 'ol/loadingstrategy';
import OlVector from 'ol/layer/vector';
import OlSourceVector from 'ol/source/vector';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Layer } from '../layers-selector/layers-selector.component';
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
  layerWFS: OlVector;
  @Input() id = 'map';
  @Input() layersSubject: Subject<Layer>;
  styles = [
    new Style({
      stroke: new Stroke({
        color: '#0c61ff',
        width: 4
      })
    })
  ];
  streetName: string = 'Le';
  constructor(private dataService: DataService, private _http: HttpClient) { }

  ngOnInit() {
    this.parentSubject.subscribe(event => {
      if (this.map) {
        this.map.updateSize();
      }
    });
    this.layersSubject.subscribe(l => {
      this.updateLayer(l);
    });
    this.source = new XYZ({
      // Tiles from Mapbox (Light)
      url: 'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
    });
    this.layer = new TileLayer({
      source: this.source
    });
    this.view = new View({
      center: Proj.fromLonLat([19.3053432, 50.624226]),
      zoom: 10
    });
    this.layerWFS = this.getLayer();
  }
  init() {
    this.map = new Map({
      target: this.id,
      layers: [this.layer, this.layerWFS],
      view: this.view
    });
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
  getColor(feature) {
    let color = '#ff00ff';
    switch (feature.getProperties().name) {
      case 'feature-1':
        color = '#ff1200';
        break;
      case 'feature-2':
        color = '#00FF00';
        break;
      case 'feature-3':
        color = '#ff1200';
        break;
    }
    return color;
  }
  getStyle(feature, resolution) {
    console.log(feature);
    return new Style({
      image: new Circle({
        radius: 10,
        stroke: new Stroke({
          color: '#fff'
        }),
        fill: new Fill({
          color: this.getColor(feature)
        })
      })
    });
  }
  setStreetName() {
    this.layerWFS.getSource().clear(true);
    console.log(this.streetName);
    
  }
  getLayer() {
    const style = this.styles[0];
    return new OlVector({
      source: new OlSourceVector({
        loader: (extent) => {
          let params = new HttpParams();
          params = params.append('service', 'WFS')
            .append('version', '1.1.0')
            .append('request', 'GetFeature')
            .append('typename', 'powerlines')
            .append('srsname', 'EPSG:3857');
            // .append('CQL_FILTER', 'name like \'' + this.streetName + '%\'');
          // .append('bbox', extent.join(',') + ',EPSG:3857');
          this._http.get('http://localhost:8080/geoserver/ows', { params: params, responseType: 'text' }).subscribe((response) => {
            this.layerWFS
              .getSource()
              .addFeatures(new WFS()
                .readFeatures(response));
          }, err => {
            console.log('failed', err);
          });
        },
        // strategy: loadingstrategy.bbox
      }),
      style: (f, res) => this.style(f, res)
    });
  }
  style(f, res) {
    const s = this.styles[0];
    const zoom = this.map.getView().getZoom();
    const dsize = (100 / res) / zoom;
    let size = Math.round(dsize);
    if (size < 0.01) {
      size = 0.5;
    }
    if (size > 10) {
      size = 10;
    }
    s.getStroke().setWidth(size);
    return s;
  }
  updateLayer(layer: Layer): any {
    console.log(layer);
  }
}
