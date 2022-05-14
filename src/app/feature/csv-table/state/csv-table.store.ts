import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Article } from './csv-table.model';

export interface CsvTableState extends EntityState<Article> {
  exportCsv: boolean;
  edited: boolean;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'csv-table', idKey: 'hauptartikelnr', resettable: true })
export class CsvTableStore extends EntityStore<CsvTableState> {
  constructor() {
    super({
      exportCsv: false,
      edited: false,
    });
  }
}
