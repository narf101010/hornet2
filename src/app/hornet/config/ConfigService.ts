import { IHornetConfig } from './IHornetConfig';
import { Injectable } from '@angular/core';
import * as filesystem from 'fs';

const configFile = './hornet2.config.json';

@Injectable()
export class ConfigService {
  private config: IHornetConfig;

  public constructor() {
    console.log('new instance', Date.now());
  }

  public set(config: IHornetConfig): void {
    this.config = config;
    filesystem.writeFileSync(configFile, JSON.stringify(this.config));

    console.log('update configuration', JSON.stringify(this.config));
  }

  public get(): IHornetConfig {
    if (this.config === undefined) {
      try {
        const raw = filesystem.readFileSync(configFile);

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
