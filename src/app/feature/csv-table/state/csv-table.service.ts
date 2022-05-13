import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { CsvTable } from './csv-table.model';
import { CsvTableStore } from './csv-table.store';

@Injectable({ providedIn: 'root' })
export class CsvTableService {
  constructor(private csvTableStore: CsvTableStore, private http: HttpClient) {}

  get() {
    return this.http.get<CsvTable[]>('https://api.com').pipe(
      tap((entities) => {
        this.csvTableStore.set(entities);
      })
    );
  }

  add(csvTable: CsvTable) {
    this.csvTableStore.add(csvTable);
  }

  update(id, csvTable: Partial<CsvTable>) {
    this.csvTableStore.update(id, csvTable);
  }

  remove(id: ID) {
    this.csvTableStore.remove(id);
  }
}
