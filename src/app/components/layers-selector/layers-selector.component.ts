import { Component, OnInit, Input } from '@angular/core';
import { WidgetPosition } from '../../interfaces/widget-position';

@Component({
  selector: 'app-layers-selector',
  templateUrl: './layers-selector.component.html',
  styleUrls: ['./layers-selector.component.scss']
})
export class LayersSelectorComponent implements OnInit {
  @Input() name = '';
  @Input() position: WidgetPosition;
  constructor() { }

  ngOnInit() {
  }

}
