import { FETCH_PROFILE,
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE_SUCCESS } from '../actions/actions.types';

const INITIAL_STATE = {
  profileInformations: {},
  profileLoading: true,
  profileError: false,
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_PROFILE:
    return {
      ...state,
      profileLoading: true,
    };
  case FETCH_PROFILE_SUCCESS:
    return {
      ...state,
      profileInformations: action.data,
      profileLoading: false,
    };
  case FETCH_PROFILE_ERROR:
    return {
      ...state,
      profileError: action.error,
      profileLoading: false,
    };
  default:
    return state;
  }
};

export default profileReducer;
