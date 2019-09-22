import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ReactModal from 'react-modal';
import { configure } from 'mobx';

import App from './components/App';
import { unregister } from './serviceWorker';
import Store from './store';

import './index.css';

configure({ enforceActions: "always" });

const store = new Store();

ReactModal.setAppElement('#root');

ReactDOM.render(
  <BrowserRouter>
    <App store={store} />
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
unregister();
