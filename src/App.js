import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './store';
import { ToastContainer } from 'react-toastify';

import Charts from './components/Charts';
import 'materialize-css/dist/css/materialize.min.css';
import 'react-vis/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';
import './static/assets/style.scss';

const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Charts />
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
