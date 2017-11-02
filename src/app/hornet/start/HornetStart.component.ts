import { Component } from '@angular/core';
import { IServerList } from './IServerList';
import { HttpClient } from '@angular/common/http';
import { IServerInstance } from './IServerInstance';

@Component({
  selector: 'app-hornet-start',
  templateUrl: './HornetStart.component.html',
  styleUrls: [],
})
export class HornetStartComponent {
  public isLoading: boolean;
  public serverLists: Array<IServerList>;
  public lastUpdate: Date;

  public constructor(private http: HttpClient) {
    this.serverLists = [];
    this.lastUpdate = new Date(0);

    this.getServerLists(false);
  }

  public getServerLists(isButtonLoading: boolean): void {
    if (this.isLoading === true || this.getTimeSinceLastUpdate() < 15000) {
      return;
    }
    this.isLoading = true;
    this.http.get<Array<IServerList>>('')
        .subscribe((data) => {
          console.log(data);
          this.serverLists = data;
          this.isLoading = false;
          this.lastUpdate = new Date();
        });
  }

  private getTimeSinceLastUpdate(): number {
    return Date.now() - this.lastUpdate.getTime();
  }

  public launch(serverInstance: IServerInstance, is64Bit: boolean): void {
    console.log('launch', serverInstance, is64Bit);
  }
}
