import { Injectable } from '@angular/core';
import { CsvTableStore } from './csv-table.store';
import { applyTransaction } from '@datorama/akita';
import { CustomColDef } from './csv-table.model';

@Injectable({ providedIn: 'root' })
export class CsvTableService {
  constructor(private csvTableStore: CsvTableStore) {}

  saveParsedValue(data: any): void {
    console.log('data', data[0]);
    console.log('data type', typeof data);

    applyTransaction(() => {
      this.csvTableStore.update({
        colDefs: this.createColumnsDef(data.pop() as Record<string, string>),
        entities: data,
      });
    });
  }

  private createColumnsDef(record: Record<string, string>) {
    return Object.keys(record).map((key) => new CustomColDef(key, key));
  }
}
