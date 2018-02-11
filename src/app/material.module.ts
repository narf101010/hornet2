import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatIconModule, MatInputModule,
  MatSidenavModule, MatSnackBarModule, MatToolbarModule, MatTooltipModule, MatSlideToggleModule,
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
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSlideToggleModule,
];

@NgModule({
  imports: components,
  exports: components,
})
export class MaterialModule {
}
