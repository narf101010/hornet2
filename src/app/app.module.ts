import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { HornetStartComponent } from './hornet/start/HornetStart.component';
import { HornetConfigComponent } from './hornet/config/HornetConfig.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HornetStartComponent,
    HornetConfigComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
  ],
  exports: [
    BrowserModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
