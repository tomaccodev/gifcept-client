import { configure } from 'mobx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactModal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import Store from './store';

import './index.css';

configure({ enforceActions: true });

const store = new Store();

ReactModal.setAppElement('#root');

ReactDOM.render(
  <BrowserRouter>
    <App store={store} />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement,
);
registerServiceWorker();

store.gifs.getGifs();
