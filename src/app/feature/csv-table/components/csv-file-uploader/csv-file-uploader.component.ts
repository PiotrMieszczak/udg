import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxCsvParser } from 'ngx-csv-parser';
import {
  filter,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { CsvTableService } from '../../state/csv-table.service';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import {
  assertProperties,
  parseKeysToLowerCase,
} from '../../../../utils/utils';
import { ARTICLE_PROPS } from '../../const/csv-table.const';
import { CsvTableQuery } from '../../state/csv-table.query';

@Component({
  selector: 'app-csv-file-uploader',
  templateUrl: './csv-file-uploader.component.html',
  styleUrls: ['./csv-file-uploader.component.scss'],
})
export class CsvFileUploaderComponent implements OnInit, OnDestroy {
  edited = false;
  readonly control = new FormControl();
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly ngxCsvParser: NgxCsvParser,
    private readonly _storeService: CsvTableService,
    private readonly _storeQuery: CsvTableQuery,
    @Inject(TuiAlertService) private readonly _alertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    this.startControlSubscription();
    this.isTableEdited();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }

  onReject(): void {
    this._alertService
      .open('only CSV file format is accepted', {
        label: 'Wrong file format!',
        status: TuiNotification.Error,
      })
      .pipe(take(1))
      .subscribe();
  }

  removeFile(): void {
    this.control.setValue(null);
    this._storeService.resetStore();
  }

  exportCsv(): void {
    this._storeService.exportCsv(true);
  }

  isTableEdited(): void {
    this._storeQuery
      .select('edited')
      .pipe(takeUntil(this._destroy$))
      .subscribe((edited) => (this.edited = edited));
  }

  private startControlSubscription(): void {
    this.control.valueChanges
      .pipe(
        filter(Boolean),
        switchMap((res: File) => {
          return this.ngxCsvParser.parse(res, { header: true, delimiter: ';' });
        }),
        filter((data) => Array.isArray(data)),
        map((data) => {
          const dataWithLowerCasedKeys = parseKeysToLowerCase(
            data as Record<string, string>[]
          );
          assertProperties(ARTICLE_PROPS, dataWithLowerCasedKeys[0]);
          return dataWithLowerCasedKeys;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((res: any) => {
        this._storeService.saveParsedValue(res);
      });
  }
}
