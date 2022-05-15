import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/nav-bar/navigation.component';
import { TuiTabsModule } from '@taiga-ui/kit';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, TuiTabsModule, RouterModule],
  exports: [NavigationComponent],
})
export class NavigationModule {}
