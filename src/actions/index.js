import {
  GET_DATA,
  PAUSE_FETCHING,
  RESUME_FETCHING,
  UPDATE_DATA,
} from './types';

export const getData = () => ({
  type: GET_DATA,
});

export const updateData = (payload) => ({
  type: UPDATE_DATA,
  payload,
});

export const stopFetching = () => ({
  type: PAUSE_FETCHING,
});

export const resumeFetching = () => ({
  type: RESUME_FETCHING,
});
