import { EventEmitter } from 'events';

export enum Events {
  logout = 'logout',
}

export default new EventEmitter();
