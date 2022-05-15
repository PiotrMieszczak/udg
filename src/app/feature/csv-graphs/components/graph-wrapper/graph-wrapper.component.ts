import { Component } from '@angular/core';
import { CsvTableQuery } from '../../../csv-table/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-graph-wrapper',
  templateUrl: './graph-wrapper.component.html',
  styleUrls: ['./graph-wrapper.component.scss'],
})
export class GraphWrapperComponent {
  selectedFile$: Observable<boolean>;

  constructor(private readonly _storeQuery: CsvTableQuery) {
    this.selectedFile$ = this._storeQuery.select('loaded');
  }
}
