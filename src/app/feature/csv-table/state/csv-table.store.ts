import { Injectable } from '@angular/core';
import { EntityState, Store, StoreConfig } from '@datorama/akita';
import { CustomColDef } from './csv-table.model';

export interface CsvTableState extends EntityState<any> {
  colDefs: CustomColDef[] | null;
  test: any;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'csv-table' })
export class CsvTableStore extends Store<CsvTableState> {
  constructor() {
    super({
      colDefs: null,
      test: [],
    });
  }
}
