import {
  put,
  takeEvery,
  call,
  select,
  delay,
} from 'redux-saga/effects';

import {
  GET_DATA,
  GET_DATA_FULFILLED,
  GET_DATA_REJECTED,
  UPDATE_DATA,
  UPDATE_DATA_FULFILLED,
  PAUSE_FETCHING,
  RESUME_FETCHING,
} from '../actions/types';

import { fetchData } from '../api';

function* getData() {
  for (let i = 0; i < process.env.MAX_RECONNECT_ATTEMPTS; i++) {
    try {
      while (yield select((store) => !store.user.stopFetching)) {
        const payload = yield call(fetchData);

        const lastData = payload.data.slice(Math.max(payload.data.length - 20, 0));

        yield put({
          type: GET_DATA_FULFILLED,
          payload: lastData,
        });
        yield delay(1000);
      }
    } catch (err) {
      if (i < 5) {
        yield put({
          type: GET_DATA_REJECTED,
          payload: err,
        });
        yield delay(2000);
      }
    }
  }
}

function* updateData({ payload }) {
  const data = yield select((store) => store.data.data);

  const newData = data.map(({ timestamp, index, stocks }) => {
    if (index === payload.index) {
      return ({
        timestamp: payload.timestamp,
        index: payload.index,
        stocks: {
          NASDAQ: payload.stocks.NASDAQ,
          CAC40: payload.stocks.CAC40,
        },
      });
    } else {
      return ({
        timestamp,
        index,
        stocks,
      })
    }
  });

  yield put({
    type: UPDATE_DATA_FULFILLED,
    payload: newData,
  });
}

function* watchGetData() {
  yield takeEvery([GET_DATA, PAUSE_FETCHING, RESUME_FETCHING], getData);
}

function* watchUpdateData() {
  yield takeEvery(UPDATE_DATA, updateData);
}

export default [
  watchGetData(),
  watchUpdateData(),
];
