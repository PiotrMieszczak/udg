import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AgChartOptions } from 'ag-grid-community';
import { CsvTableQuery, CsvTableService } from '../../../csv-table/state';
import { filter, map } from 'rxjs';
import { getDataPercentageByKey } from '../../../../utils/utils';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @Input()
  pieChartProp: string = '';

  options: AgChartOptions = {
    data: [],
    series: [
      {
        type: 'pie',
        angleKey: 'value',
        labelKey: 'label',
      },
    ],
  };

  constructor(
    private readonly _csvTableQuery: CsvTableQuery,
    private readonly _csvTableService: CsvTableService,
    private readonly _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this._csvTableQuery
      .selectAll()
      .pipe(
        filter((data) => !!data.length),
        map((data) => getDataPercentageByKey(data, this.pieChartProp))
      )
      .subscribe((data) => {
        const clone = { ...this.options };
        clone.data = data;
        this.options = clone;
      });
  }
}
