import { Component, ViewContainerRef } from '@angular/core';
import { ConfigService } from './ConfigService';
import { IHornetConfig } from './IHornetConfig';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector:    'app-hornet-config',
  templateUrl: './HornetConfig.component.html',
})
export class HornetConfigComponent {
  public config: IHornetConfig;

  public constructor(private configService: ConfigService,
                     public snackBar: MatSnackBar,
                     public viewContainerRef: ViewContainerRef) {
    this.config = this.configService.get();
  }

  public onSubmit(config: IHornetConfig) {
    this.config = config;

    console.log('submit', this.config);
    this.configService.set(this.config);

    const snackConfig: MatSnackBarConfig = {
      viewContainerRef: this.viewContainerRef,
      duration:         750,
      panelClass:       'echo-snack-bar',
    };
    this.snackBar.open('Speichern erfolgreich', undefined, snackConfig);
  }
}
