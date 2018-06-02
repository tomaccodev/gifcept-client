import AuthenticationStore from './auth';
import GifsStore from './gifs';
import UIStore from './ui';

export default class {
  public auth = new AuthenticationStore();
  public gifs = new GifsStore();
  public ui = new UIStore();
}
