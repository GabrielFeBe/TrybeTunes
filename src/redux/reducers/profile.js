import { FETCH_PROFILE,
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE_SUCCESS,
  UPDATE_PROFILE_LOCALLY,
  UPDATING_FAVORITES_LOCALLY } from '../actions/actions.types';

const INITIAL_STATE = {
  profileInformations: {},
  profileLoading: true,
  profileError: false,
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATING_FAVORITES_LOCALLY:
    return {
      ...state,
      profileInformations: { ...state.profileInformations, favorites: action.data },
    };
  case UPDATE_PROFILE_LOCALLY:
    return {
      ...state,
      profileInformations: { name: action.data.name,
        email: action.data.email,
        description: action.data.description,
        image: action.data.image,
        id: state.profileInformations.id,
        favorites: state.profileInformations.favorites },
    };
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
