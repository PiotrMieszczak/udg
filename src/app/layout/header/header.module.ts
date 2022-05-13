import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {TuiButtonModule} from "@taiga-ui/core";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    TuiButtonModule,
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
