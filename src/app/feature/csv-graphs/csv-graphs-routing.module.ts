import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphWrapperComponent } from './components/graph-wrapper/graph-wrapper.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/charts',
    pathMatch: 'full',
  },
  {
    path: 'charts',
    component: GraphWrapperComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CsvGraphsRoutingModule {}
