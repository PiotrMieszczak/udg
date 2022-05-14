import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { CsvTableComponent } from './csv-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { ChangeDetectorRef } from '@angular/core';
import { CsvTableService } from '../../state/csv-table.service';
import { CsvTableQuery } from '../../state/csv-table.query';
import { of } from 'rxjs';
import { CellEditingStoppedEvent, GridReadyEvent } from 'ag-grid-community';

const MOCK_DATA = [
  {
    hauptartikelnr: '102.85',
    artikelname: "Paul - Men's Supersoft Organic T-Shirt",
    hersteller: 'Nakedshirt Nakedshirt',
    beschreibung: 'Single Jersey, Rundhalsausschnitt',
    materialangaben: '100% Bio-Baumwolle',
    geschlecht: 'Herren',
    produktart: 'T-Shirts',
    ärmel: 'Kurzarm',
    bein: '',
    kragen: 'Rundhals',
    herstellung: 'Fair & Umweltfreundlich',
    taschenart: '',
    grammatur: '200 g/m²',
    material: 'Bio-Baumwolle',
    ursprungsland: '',
    bildname: '102.85.jpg',
  },
];

describe('CsvTableComponent', () => {
  let spectator: Spectator<CsvTableComponent>;
  let csvTableQuery: CsvTableQuery;
  let csvTableService: CsvTableService;

  const createComponent = createComponentFactory({
    component: CsvTableComponent,
    providers: [CsvTableService, CsvTableQuery, ChangeDetectorRef],
    imports: [AgGridModule],
  });

  beforeEach(() => {
    spectator = createComponent();
    csvTableQuery = spectator.inject(CsvTableQuery);
    csvTableService = spectator.inject(CsvTableService);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should get rowData onGridReady', () => {
    const querySpy = jest
      .spyOn(csvTableQuery, 'selectAll')
      .mockReturnValue(of(MOCK_DATA));

    spectator.component.onGridReady({} as GridReadyEvent);
    spectator.detectChanges();

    expect(querySpy).toHaveBeenCalled();
    expect(spectator.component.rowData).toBe(MOCK_DATA);
  });

  it('should update row on edit', () => {
    const serviceSpy = jest.spyOn(csvTableService, 'updateRowValue');
    const mockEvent = {
      data: MOCK_DATA,
      newValue: 'test',
      oldValue: 'test 2',
      column: {
        getColId() {
          return 'geschlecht';
        },
      },
    };

    spectator.component.onCellEditingStopped(
      mockEvent as CellEditingStoppedEvent
    );
    spectator.detectChanges();

    expect(serviceSpy).toHaveBeenCalledWith(
      mockEvent.data,
      mockEvent.column.getColId(),
      mockEvent.newValue
    );
  });

  it('should not update row on edit when newValue is same as new', () => {
    const serviceSpy = jest.spyOn(csvTableService, 'updateRowValue');
    const mockEvent = {
      data: MOCK_DATA,
      newValue: 'test',
      oldValue: 'test',
      column: {
        getColId() {
          return 'geschlecht';
        },
      },
    };

    spectator.component.onCellEditingStopped(
      mockEvent as CellEditingStoppedEvent
    );
    spectator.detectChanges();

    expect(serviceSpy).not.toHaveBeenCalled();
  });

  it('should not update row on edit when newValue is same as new', () => {
    const mockGridEvent = {
      api: {
        exportDataAsCsv() {},
      },
    };
    csvTableService.exportCsv(true);
    spectator.detectChanges();

    spectator.component.onGridReady(mockGridEvent as GridReadyEvent);
    spectator.detectChanges();

    // @ts-ignore
    const serviceSpy = jest.spyOn(
      // @ts-ignore
      spectator.component.gridApi,
      'exportDataAsCsv'
    );

    spectator.component.exportCsv();

    expect(serviceSpy).toHaveBeenCalled();
  });
});
