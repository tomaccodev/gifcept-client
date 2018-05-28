import { configure } from 'mobx';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import Store from './store';

import './index.css';

configure({ enforceActions: true });

const store = new Store();

ReactDOM.render(<App store={store} />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
