import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { CsvFileUploaderComponent } from './csv-file-uploader.component';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CsvTableService } from '../../state/csv-table.service';
import { CsvTableQuery } from '../../state/csv-table.query';
import { NgxCsvParser } from 'ngx-csv-parser';
import { Component, forwardRef } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { of } from 'rxjs';

/* eslint-disable */
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

@Component({
  template: '<input type="text">',
  selector: 'tui-input-files',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TuiInputFilesMockComponent),
      multi: true,
    },
  ],
})
class TuiInputFilesMockComponent {
  constructor() {}
  writeValue(): void {}
  registerOnChange(): void {}
  registerOnTouched(): void {}
}

@Component({
  template: '<div></div>',
  selector: 'tui-file',
})
class TuiFileMockComponent {
  constructor() {}
  writeValue(): void {}
  registerOnChange(): void {}
  registerOnTouched(): void {}
}
@Component({
  template: '<div><ng-content></ng-content></div>',
  selector: 'tui-files',
})
class TuiFilesMockComponent {
  constructor() {}
  writeValue(): void {}
  registerOnChange(): void {}
  registerOnTouched(): void {}
}

describe('CsvFileUploaderComponent', () => {
  let spectator: Spectator<CsvFileUploaderComponent>;
  let alertService: TuiAlertService;
  let csvTableQuery: CsvTableQuery;
  let csvTableService: CsvTableService;
  let ngxCsvParser: NgxCsvParser;

  const createComponent = createComponentFactory({
    component: CsvFileUploaderComponent,
    declarations: [
      TuiFileMockComponent,
      TuiInputFilesMockComponent,
      TuiFilesMockComponent,
    ],
    imports: [ReactiveFormsModule],
    providers: [
      CsvTableService,
      CsvTableQuery,
      TuiAlertService,
      {
        provide: NgxCsvParser,
        useValue: { parse: jest.fn().mockReturnValue(of(MOCK_DATA)) },
      },
      {
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => TuiInputFilesMockComponent),
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
    alertService = spectator.inject(TuiAlertService);
    csvTableQuery = spectator.inject(CsvTableQuery);
    csvTableService = spectator.inject(CsvTableService);
    ngxCsvParser = spectator.inject(NgxCsvParser);
  });

  it('should create', () => {
    spectator = createComponent();

    expect(spectator.component).toBeTruthy();
  });

  it('should open alert service on wrong file upload', () => {
    const spy = jest.spyOn(alertService, 'open');
    const data = {
      label: 'Wrong file format!',
      status: TuiNotification.Error,
    };

    spectator.component.onReject();

    expect(spy).toHaveBeenCalledWith('only CSV file format is accepted', data);
  });

  it('should clear store and form on remove', () => {
    const spy = jest.spyOn(csvTableService, 'resetStore');
    spectator.component.removeFile();

    spectator.detectChanges();

    expect(spectator.component.form.value).toStrictEqual({ files: null });
    expect(spy).toHaveBeenCalled();
  });

  it('should clear store and form on remove', () => {
    const spy = jest.spyOn(csvTableService, 'saveParsedValue');

    spectator.component.form.setValue({
      files: {},
    });

    spectator.component.form.controls['files'].valueChanges.subscribe((res) => {
      expect(res).toBe(MOCK_DATA);
      expect(spy).toHaveBeenCalledWith(MOCK_DATA);
    });
  });
});
