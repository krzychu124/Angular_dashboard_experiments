import { Injectable } from '@angular/core';
import { WidgedSettings } from '../interfaces/widged-settings';
import { WidgetPosition } from '../interfaces/widget-position';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private static currentId = 0;
  settings = {};
  private components: Array<WidgedSettings> = [];
  public static getNextId(): number {
    return DataService.currentId++;
  }
  constructor() {
    this.initComponents();
  }
  getSettings(id) {
    if (this.settings[id]) {
      return this.settings[id];
    } else {
      return {
        w: 500,
        h: 300,
        x: 0,
        y: 0
      };
    }
  }
  setSettings(id, settings) {
    this.settings[id] = settings;
  }

  private initComponents() {
    this.components.push(this.setComponents('map', [1, 1], [40, 25]));
    // this.components.push(this.setComponents('map', [1, 13]));
    this.components.push(this.setComponents('layerConfig', [1, 41], [10, 40]));
    // this.components.push(this.setComponents('table', [11, 1]));
    this.components.push(this.setComponents('table', [26, 1], [40, 20]));
    // this.components.push(this.setComponents('layerConfig', [31, 1]));
    // this.components.push(this.setComponents('map', [31, 13]));
  }

  private setComponents(type: string, topLeft: [number, number], wh: [number, number]) {
    const id = DataService.getNextId();
    const w = 40;
    const h = 50;
    return {
      widgetType: type,
      id: id,
      name: 'test ' + type + '_' + id,
      position: {
        // bottom: h - (topLeft[1] + 10),
        height: wh[1],
        left: topLeft[1],
        // right: w - (topLeft[0] + 12),
        top: topLeft[0],
        width: wh[0]
      } as WidgetPosition,
      originScale: [40, 50],
      options: {}
    } as WidgedSettings;
  }
  public getWidgets(i: number) {
    return this.components[i];
  }
}
