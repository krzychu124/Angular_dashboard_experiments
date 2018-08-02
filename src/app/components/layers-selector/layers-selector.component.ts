import { Component, OnInit, Input } from '@angular/core';
import { WidgetPosition } from '../../interfaces/widget-position';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataService } from '../../services/data.service';
import { MatCheckboxChange } from '@angular/material';
import { Subject } from 'rxjs';
import { Output } from '@angular/core';

@Component({
  selector: 'app-layers-selector',
  templateUrl: './layers-selector.component.html',
  styleUrls: ['./layers-selector.component.scss']
})
export class LayersSelectorComponent implements OnInit {
  @Input() name = '';
  @Input() position: WidgetPosition;
  layers: string[];
  layer: object = {};
  @Output() layerStateChanged: Subject<Layer> = new Subject;
  constructor(private _http: HttpClient, private dataService: DataService) { }

  ngOnInit() {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this._http.get(environment.geoserverRest + '/layers', { headers: headers }).subscribe(resp => {
      this.layers = [resp as string];
    }, err => console.log(err));
    this.prepareLayers();
  }
  prepareLayers() {
    this.dataService.getLayers().subscribe(resp => {
      this.layers = resp as string[];
      this.layers.forEach(l => {
        this.layer[l] = false;
      });
    });
  }
  checkboxStateChanged($event: MatCheckboxChange) {
    this.layerStateChanged.next({name: $event.source.name, visible: $event.checked }as Layer);
  }
}
export interface Layer {
  name: string;
  visible: boolean;
}
