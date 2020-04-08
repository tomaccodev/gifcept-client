import { createContext } from 'react';

import AuthStore from '../stores/auth';
import GifsStore from '../stores/gifs';

export const storesContext = createContext({
  auth: new AuthStore(),
  gifs: new GifsStore(),
});
