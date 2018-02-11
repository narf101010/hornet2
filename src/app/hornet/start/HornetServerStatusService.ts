import { query } from 'gamedig';
import { IServerList } from './IServerList';
import { IServerInstance } from './IServerInstance';

export class HornetServerStatusService {
  public async update(serverList: IServerList): Promise<void> {
    serverList.instances.forEach(async (serverInstance) => {
      serverInstance.isRunning = undefined;
      serverInstance.isRunning = await this.isRunning(serverInstance);
    });
  }

  private async isRunning(serverInstance: IServerInstance): Promise<boolean> {
    try {
      const state = await query({ host: serverInstance.host, type: 'arma3', port: serverInstance.port });
      return state !== undefined;
    } catch (error) {
      return false;
    }
  }
}
