import { WidgetPosition } from './widget-position';

export interface WidgedSettings {
    id: number;
    widgetType: string;
    name: string;
    position: WidgetPosition;
    originScale: [number, number];
    options: {};
}
