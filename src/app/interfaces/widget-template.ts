import { TemplateRef } from "@angular/core";
import { Subject } from "rxjs";

export interface MapWidgetContext extends GenericContext<MapWidgetContext> {
    type: 'MAP';
    subject: Subject<void>;
    layerSubject: Subject<any>;
}
export class TableWidgetContext implements GenericContext<TableWidgetContext> {
    type: 'TABLE';
    name: any;
}
export interface GenericContext<C> { }
export interface WidgetTemplateContext<C> {
    $implicit: GenericContext<C>;
}
export interface WidgetTemplate<C> {
    template: TemplateRef<any>;
    context: WidgetTemplateContext<C>;
}
