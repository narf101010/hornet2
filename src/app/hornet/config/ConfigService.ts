import { IHornetConfig } from './IHornetConfig';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  private config: IHornetConfig;

  public constructor() {
    console.log('new instance', Date.now());
  }

  public set(config: IHornetConfig): void {
    this.config = config;
    console.log('update configuration', this.config);
  }

  public get(): IHornetConfig {
    if (this.config === undefined) {
      console.log('load config from file');
      // TODO load config from file
      this.config = {
        profile:    'Narf',
        path:       'E:\\ArmA\\steamapps\\common\\"Arma 3"',
        parameters: '-world=empty',
      };
    }
    console.log('this.config', this.config);
    return this.config;
  }
}
