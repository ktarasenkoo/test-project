import {
  PAUSE_FETCHING,
  RESUME_FETCHING,
} from '../actions/types';

const initialStore = {
  stopFetching: false,
};

const user = (store = initialStore, { type }) => {
  switch (type) {
    case PAUSE_FETCHING:
      return ({
        ...store,
        stopFetching: true,
      });
    case RESUME_FETCHING:
      return ({
        ...store,
        stopFetching: false,
      });
    default:
      return store;
  }
};

export default user;
