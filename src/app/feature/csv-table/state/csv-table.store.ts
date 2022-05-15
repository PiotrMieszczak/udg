import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Article } from './csv-table.model';
import { TuiFileLike } from '@taiga-ui/kit';

export interface CsvTableState extends EntityState<Article> {
  exportCsv: boolean;
  edited: boolean;
  loaded: boolean;
  selectedFile: TuiFileLike | null;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'csv-table', idKey: 'hauptartikelnr', resettable: true })
export class CsvTableStore extends EntityStore<CsvTableState> {
  constructor() {
    super({
      exportCsv: false,
      edited: false,
      loaded: false,
      selectedFile: null,
    });
  }
}
