import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IServerList } from './IServerList';
import { IServerInstance } from './IServerInstance';
import { LaunchService } from './LaunchService';

@Component({
  selector:    'app-hornet-start',
  templateUrl: './HornetStart.component.html',
})
export class HornetStartComponent {
  public serverLists: Array<IServerList>;
  public lastUpdate: Date;

  public constructor(private http: HttpClient,
                     private launchService: LaunchService) {
    this.serverLists = [];
    this.lastUpdate  = new Date(0);

    this.getServerLists(false);
  }

  public getServerLists(isButtonLoading: boolean): void {
    this.http.get<Array<IServerList>>('http://stinger.echo12.de/overlay')
        .subscribe((data) => {
          console.log(data);
          this.serverLists = data;
          this.lastUpdate  = new Date();
        });
  }

  public launch(serverInstance: IServerInstance, is64Bit: boolean): void {
    this.launchService.launch(serverInstance, is64Bit);

  }
}
