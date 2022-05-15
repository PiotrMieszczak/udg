import { PieChartComponent } from './pie-chart.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { CsvTableQuery, CsvTableService } from '../../../csv-table/state';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { MockModule } from 'ng-mocks';

describe('PieChartComponent', () => {
  let spectator: Spectator<PieChartComponent>;
  let csvTableQuery: CsvTableQuery;
  let csvTableService: CsvTableService;

  const createComponent = createComponentFactory({
    component: PieChartComponent,
    imports: [MockModule(AgChartsAngularModule)],
    providers: [CsvTableService, CsvTableQuery],
  });

  beforeEach(() => {
    spectator = createComponent();
    csvTableQuery = spectator.inject(CsvTableQuery);
    csvTableService = spectator.inject(CsvTableService);
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
