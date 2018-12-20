import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatTabsModule,
} from '@angular/material';

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
  MatExpansionModule,
  MatTabsModule,
];

@NgModule({
  imports: components,
  exports: components,
})
export class MaterialModule {
}
