import { GET_PROFILES, PROFILE_LOADING } from '../actions/profileActions';

const initialState = {
  profiles: null,
  loading: true
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      }


    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};

export default profileReducer;