import { FETCH_PROFILE,
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE_SUCCESS } from './actions.types';
import fetchProfileS from '../../services/fetchProfile';

export const fetchProfileStart = () => ({
  type: FETCH_PROFILE,
});

export const fetchProfileSuccess = (profile) => ({
  type: FETCH_PROFILE_SUCCESS,
  data: profile,
});
export const fetchProfileError = (error) => ({
  type: FETCH_PROFILE_ERROR,
  error,
});

export function fetchProfile(id) {
  return async (dispach) => {
    dispach(fetchProfileStart());
    try {
      const response = await fetchProfileS(id);
      dispach(fetchProfileSuccess(response));
    } catch (error) {
      dispach(fetchProfileError(error));
    }
  };
}
