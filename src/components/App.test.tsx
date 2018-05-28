import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../../src/components/App';
import Store from '../store';

it('renders without crashing', () => {
  const store = new Store();

  const div = document.createElement('div');
  ReactDOM.render(<App store={store} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
