import { Injectable } from '@angular/core';

import { IServerInstance } from './IServerInstance';
import { ConfigService } from '../config/ConfigService';
import { IHornetConfig } from '../config/IHornetConfig';
import { ElectronService } from '../../providers/electron.service';

@Injectable()
export class LaunchService {
  private running: boolean;


  public constructor(private electronService: ElectronService,
                     private configService: ConfigService) {
    this.running = false;
  }

  public isRunning(): boolean {
    return this.running;
  }

  public launch(serverInstance: IServerInstance, is64Bit: boolean, callback: Function): void {
    const config = this.getConfig();

    if (config.path === undefined || config.profile === undefined) {
      console.log('invalid config', config);
      return;
    }

    console.log('launch', serverInstance, is64Bit, config);

    const path       = `"${config.path}\\${this.getExe(is64Bit)}"`;
    const connection = `-connect=${serverInstance.host} -port=${serverInstance.port} -password=${serverInstance.password}`;
    const mods       = `-mod=${serverInstance.modstring}`;
    const parameters = `-name=${config.profile} ${config.parameters}`;
    const command    = `${path} ${connection} ${mods} ${parameters}`;


    void this.execute(command, is64Bit, callback);
  }

  private async execute(command: string, is64Bit: boolean, callback: Function): Promise<void> {
    this.running = true;

    this.electronService.ipcRenderer.once('stop', () => {
      this.running = false;
      callback();
    });

    const name = this.getName(is64Bit);
    this.electronService.ipcRenderer.send('start', {
      name,
      command,
    });
  }

  private getConfig(): IHornetConfig {
    const config      = this.configService.get();
    config.parameters = config.parameters.replace('|', '');
    return config;
  }

  private getExe(is64Bit: boolean): string {
    return is64Bit === true ? 'arma3_x64.exe' : 'arma3.exe';
  }

  private getName(is64Bit: boolean): string {
    return is64Bit === true ? 'Arma 3 x64' : 'Arma 3 x32';
  }
}
