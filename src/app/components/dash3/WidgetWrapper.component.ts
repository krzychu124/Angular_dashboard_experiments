import { Component, TemplateRef, ViewChild, AfterViewInit, ContentChildren } from "@angular/core";
import { WidgetType } from "../../model/widget-type.enum";
import { Input } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { Subject } from "rxjs";
import { WidgetTemplate, WidgetTemplateContext, MapWidgetContext, TableWidgetContext } from "../../interfaces/widget-template";
import { QueryList } from "@angular/core/src/render3";

@Component({
    selector: '<w-weapper>',
    templateUrl: './widget-wrapper.html'
})
export class WidgetWrapperComponent implements AfterViewInit {
    @Input() template: WidgetTemplate<WidgetTemplateContext<any>>;
    @ViewChild('map', { read: TemplateRef }) map: TemplateRef<any>;
    @ViewChild('tab', { read: TemplateRef }) table: TemplateRef<any>;
    @ContentChildren('widget',{descendants: false}) widgets: any;
    @Input()
    set type(type: WidgetType) {
        this._type = type;
    }
    get type() { return this._type }
    @Input() sub: Subject<void> = new Subject();
    context: object;
    private _type: WidgetType;
    constructor(private cd: ChangeDetectorRef) {
    }

    private setTemplate() {
        switch (this.type) {
            case 0:
                this.template = {
                    template: this.map,
                    context: {
                        $implicit: { subject: this.sub, layerSubject: this.sub, type: 'MAP' } as MapWidgetContext
                    } as WidgetTemplateContext<MapWidgetContext>
                };
                break;
            case 1:
                this.template = {
                    template: this.table,
                    context: {
                        $implicit: { name: 'table name' }
                    } as WidgetTemplateContext<TableWidgetContext>
                };
                break;
        }
        this.cd.detectChanges();
    }
    ngAfterViewInit() {
        this.setTemplate();
    }
    switch() {
        this.type = this.type != WidgetType.MAP ? WidgetType.MAP : WidgetType.TABLE;
        this.setTemplate();
    }
}