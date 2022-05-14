import { Injectable } from '@angular/core';
import { CsvTableStore } from './csv-table.store';
import { Article, IArticle } from './csv-table.model';

@Injectable({ providedIn: 'root' })
export class CsvTableService {
  constructor(private csvTableStore: CsvTableStore) {}

  saveParsedValue(data: IArticle[]): void {
    this.csvTableStore.set(this.parseToArticleObj(data));
  }

  private parseToArticleObj(data: IArticle[]): Article[] {
    return data.map((row) => new Article(row));
  }
}
