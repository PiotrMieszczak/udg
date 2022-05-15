import { Inject, Injectable } from '@angular/core';
import { CsvTableStore } from './csv-table.store';
import { Article, IArticle } from './csv-table.model';
import { transaction } from '@datorama/akita';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CsvTableService {
  constructor(
    @Inject(TuiAlertService) private readonly _alertService: TuiAlertService,
    private csvTableStore: CsvTableStore
  ) {}

  @transaction()
  saveParsedValue(data: IArticle[], file: File): void {
    this.csvTableStore.set(this.parseToArticleObj(data));
    this.csvTableStore.update({
      loaded: true,
    });
    this.csvTableStore.update({
      selectedFile: file,
    });
  }

  @transaction()
  updateRowValue(row: Article, key: string, value: string) {
    this.csvTableStore.update({ edited: true });
    this.csvTableStore.update(row.hauptartikelnr, { [key]: value });
  }

  exportCsv(data: boolean): void {
    this.csvTableStore.update({
      exportCsv: data,
    });
  }

  @transaction()
  addRow(row: Article): void {
    this.csvTableStore.add(row);
    this.csvTableStore.update({ edited: true });
    this._alertService
      .open('Artikle added', {
        status: TuiNotification.Success,
      })
      .pipe(take(1))
      .subscribe();
  }

  resetStore(): void {
    this.csvTableStore.reset();
  }

  private parseToArticleObj(data: IArticle[]): Article[] {
    return data.map((row) => new Article(row));
  }
}
