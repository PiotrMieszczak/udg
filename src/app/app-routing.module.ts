import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./feature/csv-table/csv-table.module').then(
        (m) => m.CsvTableModule
      ),
  },
  {
    path: 'charts',
    loadChildren: () =>
      import('./feature/csv-graphs/csv-graphs.module').then(
        (m) => m.CsvGraphsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
