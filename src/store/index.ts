import AuthenticationStore from './auth';
import GifsStore from './gifs';

export default class {
  public auth = new AuthenticationStore();
  public gifs = new GifsStore();
}
