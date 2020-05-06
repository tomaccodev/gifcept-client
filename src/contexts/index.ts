import { createContext } from 'react';

import AuthStore from '../stores/auth';
import GifsStore from '../stores/gifs';
import TagsStore from '../stores/tags';

const auth = new AuthStore();
const gifs = new GifsStore();
const tags = new TagsStore();

export const storesContext = createContext({
  auth,
  gifs,
  tags,
});
