import { Injectable } from '@angular/core';
import { CsvTableStore } from './csv-table.store';
import { Article, IArticle } from './csv-table.model';

@Injectable({ providedIn: 'root' })
export class CsvTableService {
  constructor(private csvTableStore: CsvTableStore) {}

  saveParsedValue(data: IArticle[]): void {
    this.csvTableStore.set(this.parseToArticleObj(data));
  }

  updateRowValue(row: Article, key: string, value: string) {
    this.csvTableStore.update(row.hauptartikelnr, { [key]: value });
  }

  private parseToArticleObj(data: IArticle[]): Article[] {
    return data.map((row) => new Article(row));
  }
}
