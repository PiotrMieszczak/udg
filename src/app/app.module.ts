import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TuiRootModule, TuiDialogModule } from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './layout/header/header.module';

const APP_MODULES = [HeaderModule];
const UI_LIB_MODULES = [TuiRootModule, TuiDialogModule];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    [...APP_MODULES],
    [...UI_LIB_MODULES],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
