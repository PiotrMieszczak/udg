import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { AgChartsAngularModule } from 'ag-charts-angular';
import { GraphWrapperComponent } from './components/graph-wrapper/graph-wrapper.component';
import { CsvGraphsRoutingModule } from './csv-graphs-routing.module';
import { TuiNotificationModule } from '@taiga-ui/core';

@NgModule({
  declarations: [PieChartComponent, GraphWrapperComponent],
  imports: [
    CommonModule,
    AgChartsAngularModule,
    CsvGraphsRoutingModule,
    TuiNotificationModule,
  ],
  exports: [GraphWrapperComponent],
})
export class CsvGraphsModule {}
