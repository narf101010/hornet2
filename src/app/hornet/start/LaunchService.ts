import { ElectronService } from 'ngx-electron';
import { Injectable } from '@angular/core';

import { IServerInstance } from './IServerInstance';
import { ConfigService } from '../config/ConfigService';

@Injectable()
export class LaunchService {
  private static getExe(is64Bit: boolean): string {
    return is64Bit === true ? 'arma3_x64.exe' : 'arma3.exe';
  }

  public constructor(private configService: ConfigService,
                     private electronService: ElectronService) {
  }

  public launch(serverInstance: IServerInstance, is64Bit: boolean): void {
    const config = this.configService.get();

    console.log('launch', serverInstance, is64Bit, config);

    const path       = `${config.path}\\${LaunchService.getExe(is64Bit)}`,
          connection = `-connect=${serverInstance.host} -port=${serverInstance.port} -password=${serverInstance.password}`,
          mods       = `-mod=${serverInstance.modstring}`,
          parameters = `-name=${config.profile} ${config.parameters}`,
          command    = `${path} ${connection} ${mods} ${parameters}`;


    if (this.electronService.isElectronApp === true) {
      this.electronService.process.emit('message', 'launch', command);
    }
  }
}
