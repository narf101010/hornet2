import { Component } from '@angular/core';
import { ConfigService } from './ConfigService';
import { IHornetConfig } from './IHornetConfig';

@Component({
  selector:    'app-hornet-config',
  templateUrl: './HornetConfig.component.html',
})
export class HornetConfigComponent {
  public config: IHornetConfig;

  public constructor(private configService: ConfigService) {
    this.config = this.configService.get();
  }

  public onSubmit(config: IHornetConfig) {
    this.config = config;

    console.log('submit', this.config);
    this.configService.set(this.config);
  }
}
