import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Injector,
  OnInit,
} from '@angular/core';
import { filter, Subject, switchMap, take, takeUntil } from 'rxjs';
import { CsvTableService } from '../../state/csv-table.service';
import { CsvTableQuery } from '../../state/csv-table.query';
import {
  TuiAlertService,
  TuiDialogService,
  TuiNotification,
} from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { CsvAddDialogComponent } from '../csv-add-dialog/csv-add-dialog.component';
import { Article } from '../../state/csv-table.model';
import { combineQueries } from '@datorama/akita';

@Component({
  selector: 'app-csv-actions',
  templateUrl: './csv-actions.component.html',
  styleUrls: ['./csv-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsvActionsComponent implements OnInit {
  private _destroy$: Subject<void> = new Subject<void>();
  edited = false;
  loaded = false;

  constructor(
    @Inject(Injector) private injector: Injector,
    @Inject(TuiDialogService) private readonly _dialogService: TuiDialogService,
    private readonly _storeService: CsvTableService,
    private readonly _storeQuery: CsvTableQuery,
    private readonly _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isTableEdited();
  }

  exportCsv(): void {
    this._storeService.exportCsv(true);
  }

  addData(): void {
    this._dialogService
      .open(new PolymorpheusComponent(CsvAddDialogComponent, this.injector), {
        dismissible: false,
        label: 'Add artikle',
      })
      .pipe(take(1), filter(Boolean))
      .subscribe((res: unknown) => {
        this._storeService.addRow(res as Article);
      });
  }

  isTableEdited(): void {
    const tableEditQuery = this._storeQuery.select('edited');
    const tableLoaderQuery = this._storeQuery.select('loaded');

    combineQueries([tableEditQuery, tableLoaderQuery])
      .pipe(takeUntil(this._destroy$))
      .subscribe(([edited, loaded]) => {
        this.edited = edited;
        this.loaded = loaded;
        this._cdr.markForCheck();
      });
  }
}
