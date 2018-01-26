import { Component } from '@angular/core';
import { MenuItem } from './MenuItem';
import { ElectronService } from 'ngx-electron';

@Component({
  selector:    'app-root',
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.css'],
})
export class AppComponent {
  public MenuItem               = MenuItem;
  public selectedMenu: MenuItem = MenuItem.HORNET_START;
  public version: string;

  public constructor(electron: ElectronService) {
    this.version = electron.remote.app.getVersion();
  }
}
