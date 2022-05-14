import { CsvActionsComponent } from './csv-actions.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { CsvTableQuery } from '../../state/csv-table.query';
import { CsvTableService } from '../../state/csv-table.service';
import { TuiDialogService } from '@taiga-ui/core';
import { of } from 'rxjs';

const MOCK_DATA = {
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
};

describe('CsvActionsComponent', () => {
  let spectator: Spectator<CsvActionsComponent>;
  let csvTableQuery: CsvTableQuery;
  let csvTableService: CsvTableService;
  let dialogService: TuiDialogService;

  const createComponent = createComponentFactory({
    component: CsvActionsComponent,
    providers: [
      CsvTableService,
      CsvTableQuery,
      {
        provide: TuiDialogService,
        useValue: { open: jest.fn().mockReturnValue(of(MOCK_DATA)) },
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    csvTableQuery = spectator.inject(CsvTableQuery);
    csvTableService = spectator.inject(CsvTableService);
    dialogService = spectator.inject(TuiDialogService);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should invoke storeService.exportCsv method', () => {
    const serviceSpy = jest.spyOn(csvTableService, 'exportCsv');

    spectator.component.exportCsv();

    expect(serviceSpy).toHaveBeenCalledWith(true);
  });

  it('should invoke storeService.exportCsv method', () => {
    const serviceSpy = jest.spyOn(csvTableService, 'addRow');

    spectator.component.addData();
    spectator.detectChanges();

    expect(serviceSpy).toHaveBeenCalledWith(MOCK_DATA);
  });
});
