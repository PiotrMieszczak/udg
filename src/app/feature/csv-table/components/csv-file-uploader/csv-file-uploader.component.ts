import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TuiFileLike } from '@taiga-ui/kit';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { filter, Subject, switchMap, takeUntil } from 'rxjs';
import { CsvTableService } from '../../state/csv-table.service';

@Component({
  selector: 'app-csv-file-uploader',
  templateUrl: './csv-file-uploader.component.html',
  styleUrls: ['./csv-file-uploader.component.scss'],
})
export class CsvFileUploaderComponent implements OnInit, OnDestroy {
  readonly control = new FormControl();
  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private ngxCsvParser: NgxCsvParser,
    private _storeService: CsvTableService
  ) {}

  ngOnInit(): void {
    this.startControlSubscription();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }

  onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
    console.log('Wrong file formar');
  }

  removeFile(): void {
    this.control.setValue(null);
  }

  private startControlSubscription() {
    this.control.valueChanges
      .pipe(
        switchMap((res: File) => {
          return this.ngxCsvParser.parse(res, { header: true, delimiter: ';' });
        }),
        takeUntil(this._destroy$)
      )
      .subscribe((res: Record<string, string>[] | NgxCSVParserError) => {
        if (res instanceof NgxCSVParserError) {
          return;
        }
        this._storeService.saveParsedValue(res);
      });
  }
}
