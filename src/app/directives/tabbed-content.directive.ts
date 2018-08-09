import { Directive, ContentChild, Query } from '@angular/core';
import { QueryList } from '@angular/core';
import { TabContentDirective } from './tab-content.directive';

@Directive({
  selector: 'tabbed-content',
})
export class TabbedContent {
  @ContentChild(TabContentDirective) contentTpl: QueryList<TabContentDirective>
  constructor() { }

}
