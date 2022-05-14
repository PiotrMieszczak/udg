import { Component } from '@angular/core';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { COLD_DEFS } from '../../const/csv-table.const';
import { Article } from '../../state/csv-table.model';
import { CsvTableQuery } from '../../state/csv-table.query';

@Component({
  selector: 'app-csv-table',
  templateUrl: './csv-table.component.html',
  styleUrls: ['./csv-table.component.scss'],
})
export class CsvTableComponent {
  rowBuffer: number = 10;
  columnDefs: ColDef[] = COLD_DEFS;
  rowData: Article[] = [];

  constructor(private readonly _csvTableQuery: CsvTableQuery) {}

  onGridReady(params: GridReadyEvent): void {
    this._csvTableQuery.selectAll().subscribe((rows) => (this.rowData = rows));
  }
}
