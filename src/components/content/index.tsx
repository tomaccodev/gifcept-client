import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { IGif } from '../../api/gifs';

import './Content.css';
import Gifs from './sections/gifs';

interface IContent {
  onSetSelectedGif: (gif: IGif) => void;
}

export default ({ onSetSelectedGif }: IContent) => {
  return (
    <main>
      <Switch>
        <Route exact={true} path="/">
          <Gifs mode="all" onSetSelectedGif={onSetSelectedGif} />
        </Route>
        <Route exact={true} path="/myGifs">
          <Gifs mode="myGifs" onSetSelectedGif={onSetSelectedGif} />
        </Route>
        <Route exact={true} path="/trendy">
          <Gifs mode="trendy" onSetSelectedGif={onSetSelectedGif} />
        </Route>
        <Route path="/:id/gifs">
          <Gifs mode="by id" onSetSelectedGif={onSetSelectedGif} />
        </Route>
      </Switch>
    </main>
  );
};
