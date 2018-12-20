import { IServerList } from './IServerList';
import { IServerInstance } from './IServerInstance';
import { ElectronService } from '../../providers/electron.service';
import { Injectable } from '@angular/core';

@Injectable()
export class HornetServerStatusService {
  public constructor(private electronService: ElectronService) {
  }


  public async update(serverList: IServerList): Promise<void> {
    serverList.instances.forEach(async (serverInstance) => {
      serverInstance.isRunning = undefined;
      serverInstance.isRunning = await this.isRunning(serverInstance);
    });
  }

  private isRunning(serverInstance: IServerInstance): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const channel = `running-${serverInstance.host}-${serverInstance.port}`;
      console.log({ channel });
      this.electronService.ipcRenderer.once(channel, (topic, arg) => {

        console.log('running', topic, arg);
        const { isRunning } = arg;
        resolve(isRunning);
      });

      this.electronService.ipcRenderer.send('isRunning', serverInstance);
    });
  }
}
