import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { IGif } from '../../api/gifs';

import './Content.module.scss';
import Gifs, { GifMode } from './sections/gifs';

interface IContent {
  onSetSelectedGif: (gif: IGif) => void;
}

export default ({ onSetSelectedGif }: IContent) => {
  return (
    <main>
      <Switch>
        <Route exact={true} path="/">
          <Gifs mode={GifMode.all} onSetSelectedGif={onSetSelectedGif} />
        </Route>
        <Route exact={true} path="/myGifs">
          <Gifs mode={GifMode.byUser} onSetSelectedGif={onSetSelectedGif} />
        </Route>
        <Route path="/users/:userId/gifs">
          <Gifs mode={GifMode.byUser} onSetSelectedGif={onSetSelectedGif} />
        </Route>
      </Switch>
    </main>
  );
};
