import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsvWrapperComponent } from './components/csv-wrapper/csv-wrapper.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/csv-editor',
    pathMatch: 'full',
  },
  {
    path: 'csv-editor',
    component: CsvWrapperComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CsvTableRoutingModule {}
