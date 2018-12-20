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
      this.electronService.ipcRenderer.once(channel, (event, isRunning) => {
        resolve(isRunning);
      });

      this.electronService.ipcRenderer.send('isRunning', serverInstance);
    });
  }
}
