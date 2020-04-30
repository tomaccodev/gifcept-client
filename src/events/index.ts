import { EventEmitter } from 'events';

export enum Event {
  logout = 'logout',
  pasteURL = 'pasteURL',
  pasteGifFiles = 'pasteGifFiles',
}

export default new EventEmitter();
