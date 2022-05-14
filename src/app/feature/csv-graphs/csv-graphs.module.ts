import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { AgChartsAngularModule } from 'ag-charts-angular';

@NgModule({
  declarations: [PieChartComponent],
  imports: [CommonModule, AgChartsAngularModule],
  exports: [PieChartComponent],
})
export class CsvGraphsModule {}
