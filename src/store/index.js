import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  persistReducer({
    key: 'root',
    storage,
    blacklist: ['user'],
  }, rootReducer),
  compose(
    applyMiddleware(logger, sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ),
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
