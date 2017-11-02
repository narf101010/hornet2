import { Component } from '@angular/core';

@Component({
  selector: 'app-hornet-config',
  templateUrl: './HornetConfig.component.html',
  styleUrls: [],
})
export class HornetConfigComponent {
  public profile: string;
  public path: string;
  public parameters: string;

  public constructor() {
    this.profile = 'asdf';
    this.path = 'qwetz';
    this.parameters = '123';



  }

  public onSubmit() {
    console.log('submit', this.profile, this.path, this.parameters);
  }
}
