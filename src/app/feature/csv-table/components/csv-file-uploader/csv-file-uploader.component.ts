import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxCsvParser } from 'ngx-csv-parser';
import { filter, map, Subject, switchMap, take, takeUntil } from 'rxjs';
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
})
export class CsvFileUploaderComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly ngxCsvParser: NgxCsvParser,
    private readonly _storeService: CsvTableService,
    private readonly _storeQuery: CsvTableQuery,
    @Inject(TuiAlertService) private readonly _alertService: TuiAlertService
  ) {
    this.form = this.buildForm();
  }

  ngOnInit(): void {
    this.startControlSubscription();
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
    this.form.setValue({
      files: null,
    });
    this._storeService.resetStore();
  }

  private buildForm(): FormGroup {
    return new FormGroup({
      files: new FormControl(),
    });
  }

  private startControlSubscription(): void {
    this.form.controls['files'].valueChanges
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
