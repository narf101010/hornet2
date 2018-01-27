import { IHornetConfig } from './IHornetConfig';
import { Injectable } from '@angular/core';
import * as filesystem from 'fs';
import * as os from 'os';
import { ElectronService } from 'ngx-electron';

@Injectable()
export class ConfigService {
  private config: IHornetConfig;
  private configFile: string;

  public constructor(private electronService: ElectronService) {
    const appDataFolder = electronService.process.env.APPDATA;
    this.configFile     = appDataFolder + '\\hornet2\\config.json';
    console.log('use config file:', this.configFile);
  }

  public set(config: IHornetConfig): void {
    this.config = config;
    filesystem.writeFileSync(this.configFile, JSON.stringify(this.config));

    console.log('update configuration', this.configFile, JSON.stringify(this.config));
  }

  public get(): IHornetConfig {
    if (this.config === undefined) {
      try {
        const raw = filesystem.readFileSync(this.configFile);

        this.config = <IHornetConfig>JSON.parse(raw.toString());
        console.log('loaded config from file');
      } catch (error) {
        console.log('no file present, use defaults');
        this.config = {
          profile:    '',
          path:       '',
          parameters: '',
        };
      }
      // TODO load config from file
    }
    console.log('this.config', this.config);
    return this.config;
  }
}
