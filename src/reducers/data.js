import {
  GET_DATA,
  GET_DATA_FULFILLED,
  GET_DATA_REJECTED,
  UPDATE_DATA_FULFILLED,
} from '../actions/types';

const initialStore = {
  data: [],
  error: null,
};

const data = (store = initialStore, { type, payload }) => {
  switch (type) {
    case GET_DATA:
      return ({
        ...store,
      });
    case GET_DATA_FULFILLED:
      return ({
        ...store,
        data: payload,
        error: null,
      });
    case GET_DATA_REJECTED:
      return ({
        ...store,
        error: payload,
      });
    case UPDATE_DATA_FULFILLED:
      return ({
        ...store,
        data: payload,
      });
    default:
      return store;
  }
};

export default data;
