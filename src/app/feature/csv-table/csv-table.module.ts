import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvTableComponent } from './components/table/csv-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { CsvFileUploaderComponent } from './components/csv-file-uploader/csv-file-uploader.component';
import { CsvWrapperComponent } from './components/csv-wrapper/csv-wrapper.component';
import { CsvTableRoutingModule } from './csv-table-routing.module';
import { TuiInputFilesModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [
    CsvTableComponent,
    CsvFileUploaderComponent,
    CsvWrapperComponent,
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    CsvTableRoutingModule,
    TuiInputFilesModule,
  ],
  exports: [CsvTableComponent],
})
export class CsvTableModule {}
