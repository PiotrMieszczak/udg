import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsvTableComponent } from './components/table/csv-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { CsvFileUploaderComponent } from './components/csv-file-uploader/csv-file-uploader.component';
import { CsvWrapperComponent } from './components/csv-wrapper/csv-wrapper.component';
import { CsvTableRoutingModule } from './csv-table-routing.module';
import {
  TuiFilesModule,
  TuiInputFilesModule,
  TuiInputModule,
} from '@taiga-ui/kit';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule } from '@taiga-ui/core';
import { CsvActionsComponent } from './components/csv-actions/csv-actions.component';
import { CsvAddDialogComponent } from './components/csv-add-dialog/csv-add-dialog.component';
import { CsvGraphsModule } from '../csv-graphs/csv-graphs.module';

const LIB_MODULES = [
  TuiFilesModule,
  TuiInputFilesModule,
  TuiButtonModule,
  TuiInputModule,
];
const APP_MODULES = [CsvTableRoutingModule, CsvGraphsModule];

@NgModule({
  declarations: [
    CsvTableComponent,
    CsvFileUploaderComponent,
    CsvWrapperComponent,
    CsvActionsComponent,
    CsvAddDialogComponent,
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
