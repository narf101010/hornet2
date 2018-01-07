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

    this.getServerLists();
  }

  public getServerLists(): Promise<Object> {
    return this.http.get<Array<IServerList>>('http://stinger.echo12.de/overlay').toPromise()
               .then((data) => {
                 console.log(data);
                 this.serverLists = data;
                 this.lastUpdate  = new Date();
                 return data;
               });
  }

  public async launch(listIndex: number, instanceIndex: number, is64Bit: boolean): Promise<void> {
    console.log('### launch', listIndex, instanceIndex, is64Bit);
    await this.getServerLists();

    if (this.serverLists === undefined
        || this.serverLists[listIndex] === undefined
        || this.serverLists[listIndex].instances === undefined
        || this.serverLists[listIndex].instances[instanceIndex] === undefined) {
      console.log(this.serverLists);
      return;
    }

    const serverInstance = this.serverLists[listIndex].instances[instanceIndex];
    this.launchService.launch(serverInstance, is64Bit);
  }
}
