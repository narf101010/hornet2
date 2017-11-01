import { MatButtonModule, MatCheckboxModule, MatIconModule, MatSidenavModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const components = [
  BrowserAnimationsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatSidenavModule,
];

@NgModule({
  imports: components,
  exports: components,
})
export class MaterialModule {
};
