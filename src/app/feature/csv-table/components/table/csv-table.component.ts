import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import {
  CellEditingStoppedEvent,
  ColDef,
  GridReadyEvent,
} from 'ag-grid-community';
import { COLD_DEFS } from '../../const/csv-table.const';
import { Article } from '../../state/csv-table.model';
import { CsvTableQuery } from '../../state/csv-table.query';
import { CsvTableService } from '../../state/csv-table.service';
import { GridApi } from 'ag-grid-community/dist/lib/gridApi';
import { filter } from 'rxjs';

@Component({
  selector: 'app-csv-table',
  templateUrl: './csv-table.component.html',
  styleUrls: ['./csv-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsvTableComponent {
  defaultColDef = {
    cellEditorPopup: true,
  };
  rowBuffer: number = 10;
  columnDefs: ColDef[] = COLD_DEFS;
  rowData: Article[] = [];
  gridApi: GridApi | null = null;

  constructor(
    private readonly _csvTableQuery: CsvTableQuery,
    private readonly _csvTableService: CsvTableService,
    private readonly _cdr: ChangeDetectorRef
  ) {
    this.exportCsv();
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this._csvTableQuery.selectAll().subscribe((rows) => {
      this.rowData = rows;
      this._cdr.markForCheck();
    });
  }

  exportCsv(): void {
    this._csvTableQuery
      .select('exportCsv')
      .pipe(filter(Boolean))
      .subscribe(() => {
        this.gridApi?.exportDataAsCsv({
          columnSeparator: ';',
          fileName: `Artikles ${new Date().toLocaleDateString()}.csv`,
        });
      });
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
