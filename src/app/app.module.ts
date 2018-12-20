import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';


import { ElectronService } from './providers/electron.service';

import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { ConfigService } from './components/config/ConfigService';
import { HornetServerStatusService } from './components/start/HornetServerStatusService';
import { LaunchService } from './components/start/LaunchService';
import { HornetStartComponent } from './components/start/HornetStart.component';
import { SettingsComponent } from './components/general/settings.component';
import { HornetConfigComponent } from './components/config/HornetConfig.component';

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
    HttpClientModule,
    MaterialModule,
  ],
  exports:      [MaterialModule],
  providers:    [
    ElectronService,
    ConfigService,
    LaunchService,
    HornetServerStatusService,
  ],
  bootstrap:    [AppComponent],
})
export class AppModule {
}
