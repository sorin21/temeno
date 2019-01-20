import axios from 'axios';

export const GET_PROFILES = 'GET_PROFILES';
export const getProfiles = () => {
  return (dispatch) => {
    dispatch(profileLoading());
    axios.get('http://localhost:5000/api/users')
      .then(response => {
        return dispatch({
          type: GET_PROFILES,
          payload: response.data
        })
      })
      .catch(error =>
        dispatch({
          type: GET_PROFILES,
          payload: null
        }))
  };
}

export const PROFILE_LOADING = 'PROFILE_LOADING';
export const profileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}
