import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector:    'app-general-settings',
  templateUrl: './settings.component.html',
})
export class SettingsComponent {

  public constructor(private electron: ElectronService) {
  }

  public openDevTools(): void {
    this.electron.remote.getCurrentWebContents().openDevTools({ mode: 'bottom' });
  }
}
