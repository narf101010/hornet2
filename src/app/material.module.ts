import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule,
  MatSidenavModule, MatToolbarModule, MatTooltipModule,
} from '@angular/material';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const components = [
  BrowserAnimationsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatSidenavModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatTooltipModule,
];

@NgModule({
  imports: components,
  exports: components,
})
export class MaterialModule {
};
