import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFsModule } from 'ngx-fs';
import { NgxElectronModule } from 'ngx-electron';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { HornetStartComponent } from './hornet/start/HornetStart.component';
import { HornetConfigComponent } from './hornet/config/HornetConfig.component';
import { LaunchService } from './hornet/start/LaunchService';
import { ConfigService } from './hornet/config/ConfigService';
import { SettingsComponent } from './general/settings.component';
import { HornetServerStatusService } from './hornet/start/HornetServerStatusService';

@NgModule({
  declarations: [
    AppComponent,
    HornetStartComponent,
    HornetConfigComponent,
    SettingsComponent,
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
    HornetServerStatusService,
  ],
  bootstrap:    [
    AppComponent,
  ],
})
export class AppModule {
}
