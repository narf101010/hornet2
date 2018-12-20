import { Component, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IServerList } from './IServerList';
import { LaunchService } from './LaunchService';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { HornetServerStatusService } from './HornetServerStatusService';

const REFRESH_INTERVAL = 10000;
// const REFRESH_INTERVAL = 30000;

@Component({
  selector:    'app-hornet-start',
  templateUrl: './HornetStart.component.html',
})
export class HornetStartComponent {
  public serverLists: Array<IServerList>;
  public lastUpdate: Date;

  private snackConfig: MatSnackBarConfig;
  private statusCheckHandle: any;

  public constructor(private http: HttpClient,
                     private launchService: LaunchService,
                     private statusService: HornetServerStatusService,
                     public snackBar: MatSnackBar,
                     public viewContainerRef: ViewContainerRef) {
    this.serverLists = [];
    this.lastUpdate  = new Date(0);

    this.snackConfig = {
      viewContainerRef: this.viewContainerRef,
      duration:         750,
      panelClass:       'echo-snack-bar',
    };

    void this.getServerLists();
  }

  public getServerLists(): Promise<any> {
    this.stopStatusCheck();
    return this.http.get<Array<IServerList>>('http://stinger.echo12.de/overlay').toPromise()
               .then(async (data) => {
                 console.log('load serverList', data);

                 this.fixServerNames(data);
                 await this.updateStatus(data);

                 this.serverLists = data;
                 this.lastUpdate  = new Date();

                 this.showSuccessfulMessage();

                 this.startStatusCheck();
                 return data;
               });
  }


  public async launch(listIndex: number, instanceIndex: number, is64Bit: boolean): Promise<void> {
    await this.getServerLists();
    console.log('### launch', listIndex, instanceIndex, is64Bit);

    if (this.serverLists === undefined
        || this.serverLists[listIndex] === undefined
        || this.serverLists[listIndex].instances === undefined
        || this.serverLists[listIndex].instances[instanceIndex] === undefined) {
      console.log(this.serverLists);
      return;
    }

    this.stopStatusCheck();

    const serverInstance = this.serverLists[listIndex].instances[instanceIndex];
    this.launchService.launch(serverInstance, is64Bit, () => {
      void this.getServerLists();
    });
  }

  public isRunning(): boolean {
    return this.launchService.isRunning();
  }

  private fixServerNames(serverLists: Array<IServerList>): void {
    serverLists.forEach((serverList: IServerList) => {
      if (serverList.name === 'Internal Instances of Echo12') {
        serverList.name = 'Echo12 Server';
      } else if (serverList.name === 'External Instances of Echo12') {
        serverList.name = 'Externe Server';
      }
    });
  }

  private showSuccessfulMessage(): void {
    this.snackBar.open('Aktualisieren erfolgreich', undefined, this.snackConfig);
  }

  private stopStatusCheck(): void {
    clearInterval(this.statusCheckHandle);
  }

  private startStatusCheck(): void {
    this.stopStatusCheck();

    if (this.isRunning() === true) {
      return;
    }

    this.statusCheckHandle = setInterval(async () => {
      await this.updateStatus(this.serverLists);
    }, REFRESH_INTERVAL);
  }

  private async updateStatus(serverLists: Array<IServerList>): Promise<void> {
    serverLists.forEach((serverList) => void this.statusService.update(serverList));
  }
}
