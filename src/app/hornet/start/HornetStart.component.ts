import { Component } from '@angular/core';
import { IServerList } from './IServerList';

@Component({
  selector: 'app-hornet-start',
  templateUrl: './HornetStart.component.html',
  styleUrls: [],
})
export class HornetStartComponent {
  public serverLists: Array<IServerList>;

  public constructor() {
    this.serverLists = [
      {
        'name': 'Internal Instances of Echo12',
        'instances': [
          {
            'name': 'A3 #1 OP Dagger (Advanced)',
            'game': 'a3',
            'modstring': '@e12_ace3;@e12_ace3_x;@e12_rhs_ru;@e12_tao_foldmap;@e12_tools;@e12_acre2;@e12_cba;@e12_dac;@e12_rhs_gerf;@e12_rhs_us',
            'betamod': '',
            'host': 'mars.echo12.de',
            'port': 4102,
            'password': 'e12a3',
          },
          {
            'name': 'A3 #2 Truppenübungsplatz',
            'game': 'a3',
            'modstring': '@e12_rhs_gerf;@e12_rhs_us;@e12_acre2;@e12_rhs_saf;@e12_cba;@e12_cup_maps;@e12_zusatz;@e12_ace3;@e12_cup_wp;@e12_tools;@e12_bwmod;@e12_rhs_ru;@e12_ace3_x',
            'betamod': '',
            'host': 'mars.echo12.de',
            'port': 4202,
            'password': 'e12a3',
          },
          {
            'name': 'A3 #3 Missionstest',
            'game': 'a3',
            'modstring': '@e12_tools;@e12_ace3;@e12_rhs_ru;@e12_acre2;@e12_rhs_us;@e12_ace3_x;@e12_cba;@e12_cup_maps;@e12_rhs_gerf',
            'betamod': '',
            'host': 'mars.echo12.de',
            'port': 4302,
            'password': 'e12a3',
          },
          {
            'name': 'A3 #4 Medical Test',
            'game': 'a3',
            'modstring': '@e12_hmd;@e12_tools;@e12_ace3_x;@e12_rhs_us;@e12_ace3;@e12_cba;@e12_rhs_ru;@e12_rhs_saf;@e12_rhs_gerf;@e12_opfor_pack;@e12_tao_foldmap;@e12_acre2',
            'betamod': '',
            'host': 'mars.echo12.de',
            'port': 4402,
            'password': 'e12a3',
          },
        ],
      },
      {
        'name': 'External Instances of Echo12',
        'instances': [
          {
            'name': 'External Server 2',
            'game': 'a2',
            'modstring': 'mod1;mod2',
            'betamod': 'beta',
            'host': '127.0.0.1',
            'port': 2315,
            'password': 'pass',
          },
          {
            'name': 'External Server 3',
            'game': 'a3',
            'modstring': 'mod1;mod2',
            'betamod': 'beta',
            'host': '127.0.0.1',
            'port': 2315,
            'password': 'pass',
          },
          {
            'name': 'External Server 4',
            'game': 'a3',
            'modstring': 'mod1;mod2',
            'betamod': 'beta',
            'host': '127.0.0.1',
            'port': 2302,
            'password': 'pass',
          },
          {
            'name': 'KRK Operation Dragon Sword Part II',
            'game': 'a3',
            'modstring': '@cup_vehicles;@rhsafrf;@r_unfold;@acex;@ares;@acre2;@cup_weapons;@dac;@cup_terrains;@ctab;@opfor_pack;@cba_a3;@rhsusaf;@ace;@cup_units',
            'betamod': '',
            'host': '144.76.165.148',
            'port': 2302,
            'password': 'kilo',
          },
        ],
      },
    ];
  }

}
