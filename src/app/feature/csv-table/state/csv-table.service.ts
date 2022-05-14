import { Injectable } from '@angular/core';
import { CsvTableStore } from './csv-table.store';
import { Article, IArticle } from './csv-table.model';
import { transaction } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class CsvTableService {
  constructor(private csvTableStore: CsvTableStore) {}

  saveParsedValue(data: IArticle[]): void {
    this.csvTableStore.set(this.parseToArticleObj(data));
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

  resetStore(): void {
    this.csvTableStore.reset();
  }

  private parseToArticleObj(data: IArticle[]): Article[] {
    return data.map((row) => new Article(row));
  }
}
