import { IServerInstance } from './IServerInstance';

export interface IServerList {
  name: string;
  instances: Array<IServerInstance>;
}
