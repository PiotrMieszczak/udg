import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { CsvTableStore, CsvTableState } from './csv-table.store';

@Injectable({ providedIn: 'root' })
export class CsvTableQuery extends QueryEntity<CsvTableState> {
  constructor(protected override store: CsvTableStore) {
    super(store);
  }
}
