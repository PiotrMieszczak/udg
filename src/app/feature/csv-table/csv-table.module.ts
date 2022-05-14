import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvTableComponent } from './components/table/csv-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { CsvFileUploaderComponent } from './components/csv-file-uploader/csv-file-uploader.component';
import { CsvWrapperComponent } from './components/csv-wrapper/csv-wrapper.component';
import { CsvTableRoutingModule } from './csv-table-routing.module';
import { TuiFilesModule, TuiInputFilesModule } from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule } from '@taiga-ui/core';

const LIB_MODULES = [TuiFilesModule, TuiInputFilesModule, TuiButtonModule];
const APP_MODULES = [CsvTableRoutingModule];

@NgModule({
  declarations: [
    CsvTableComponent,
    CsvFileUploaderComponent,
    CsvWrapperComponent,
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
    FormsModule,
    [...APP_MODULES],
    [...LIB_MODULES],
  ],
})
export class CsvTableModule {}
