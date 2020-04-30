import 'mobx-react/batchingForReactDom';
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import Emitter, { Event } from './events';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { GIF_MIME, URL_REGEX } from './utils/constants';

Modal.setAppElement('#root');

document.addEventListener('paste', (event) => {
  if (event.clipboardData) {
    const gifFiles = Array.from(event.clipboardData.files).filter((f) => f.type === GIF_MIME);
    if (gifFiles.length > 0) {
      Emitter.emit(Event.pasteGifFiles, Array.from(event.clipboardData.files));
    } else {
      const text = event.clipboardData.getData('text/plain');
      if (text.match(URL_REGEX)) {
        Emitter.emit(Event.pasteURL, text);
      }
    }
  }
});

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
