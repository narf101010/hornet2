import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HornetStartComponent } from './hornet/start/HornetStart.component';
import { HornetConfigComponent } from './hornet/config/HornetConfig.component';
import { LaunchService } from './hornet/start/LaunchService';
import { ConfigService } from './hornet/config/ConfigService';
import { NgxFsModule } from 'ngx-fs';
import { NgxElectronModule } from 'ngx-electron';

@NgModule({
  declarations: [
    AppComponent,
    HornetStartComponent,
    HornetConfigComponent,
  ],
  imports:      [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxElectronModule,
    NgxFsModule,
    HttpClientModule,
    MaterialModule,
  ],
  exports:      [
    BrowserModule,
    MaterialModule,
  ],
  providers:    [
    ConfigService,
    LaunchService,
  ],
  bootstrap:    [
    AppComponent,
  ],
})
export class AppModule {
}
