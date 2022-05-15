import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TuiRootModule, TuiDialogModule, TuiAlertModule } from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './layout/header/header.module';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { NavigationModule } from './layout/navigation/navigation.module';

const APP_MODULES = [HeaderModule, NavigationModule];
const UI_LIB_MODULES = [
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TuiDialogModule,
];
const STORE_MODULES = [AkitaNgDevtools.forRoot()];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    [...APP_MODULES],
    [...UI_LIB_MODULES],
    [...STORE_MODULES],
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
