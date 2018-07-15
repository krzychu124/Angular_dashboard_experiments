import { Component, OnInit, Input } from '@angular/core';
import { WidgetPosition } from '../../interfaces/widget-position';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { PeriodicElement } from '../../interfaces/periodic-element';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss']
})
export class BasicTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() name = ''; 
  @Input() position: WidgetPosition;  // table data
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  ELEMENT_DATA: PeriodicElement[];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.dataSource.data = this.tableService.getData();
    this.dataSource.paginator = this.paginator;
  }

}
