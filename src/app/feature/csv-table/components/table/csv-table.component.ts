import { Component } from '@angular/core';
import {
  CellEditingStoppedEvent,
  ColDef,
  GridReadyEvent,
} from 'ag-grid-community';
import { COLD_DEFS } from '../../const/csv-table.const';
import { Article } from '../../state/csv-table.model';
import { CsvTableQuery } from '../../state/csv-table.query';
import { CsvTableService } from '../../state/csv-table.service';

@Component({
  selector: 'app-csv-table',
  templateUrl: './csv-table.component.html',
  styleUrls: ['./csv-table.component.scss'],
})
export class CsvTableComponent {
  defaultColDef = {
    cellEditorPopup: true,
  };
  rowBuffer: number = 10;
  columnDefs: ColDef[] = COLD_DEFS;
  rowData: Article[] = [];

  constructor(
    private readonly _csvTableQuery: CsvTableQuery,
    private readonly _csvTableService: CsvTableService
  ) {}

  onGridReady(params: GridReadyEvent): void {
    this._csvTableQuery.selectAll().subscribe((rows) => (this.rowData = rows));
  }

  onCellEditingStopped(event: CellEditingStoppedEvent): void {
    if (event.newValue === event.oldValue) {
      return;
    }

    this._csvTableService.updateRowValue(
      event.data,
      event.column.getColId(),
      event.newValue
    );
  }
}
