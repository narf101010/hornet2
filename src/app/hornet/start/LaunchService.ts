import { Injectable } from '@angular/core';
import * as prompt from 'sudo-prompt';

import { IServerInstance } from './IServerInstance';
import { ConfigService } from '../config/ConfigService';
import { IHornetConfig } from '../config/IHornetConfig';

@Injectable()
export class LaunchService {
  private static getExe(is64Bit: boolean): string {
    return is64Bit === true ? 'arma3_x64.exe' : 'arma3.exe';
  }

  private static getName(is64Bit: boolean): string {
    return is64Bit === true ? 'Arma 3 x64' : 'Arma 3 x32';
  }

  public constructor(private configService: ConfigService) {
  }

  public launch(serverInstance: IServerInstance, is64Bit: boolean): void {
    const config = this.getConfig();

    if (config.path === undefined || config.profile === undefined) {
      console.log('invalid config', config);
      return;
    }

    console.log('launch', serverInstance, is64Bit, config);

    const path       = `"${config.path}\\${LaunchService.getExe(is64Bit)}"`,
          connection = `-connect=${serverInstance.host} -port=${serverInstance.port} -password=${serverInstance.password}`,
          mods       = `-mod=${serverInstance.modstring}`,
          parameters = `-name=${config.profile} ${config.parameters}`,
          command    = `${path} ${connection} ${mods} ${parameters}`;


    prompt.exec(command, { name: LaunchService.getName(is64Bit) }, console.log);
  }

  private getConfig(): IHornetConfig {
    const config      = this.configService.get();
    config.parameters = config.parameters.replace('|', '');
    return config;
  }
}
