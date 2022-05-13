import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { CsvTable } from './csv-table.model';

export interface CsvTableState extends EntityState<CsvTable> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'csv-table' })
export class CsvTableStore extends EntityStore<CsvTableState> {
  constructor() {
    super();
  }
}
