import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_REPOS,
} from './types';

// export const getCurrentProfile = () => async (dispatch) => {
//   try {
//     const res = await axios.get('/api/profile/me');

//     // console.log(res.data);
//     dispatch({
//       type: GET_PROFILE,
//       payload: res.data,
//     });
//   } catch (err) {
//     console.log('error');
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

//get all profgiles with name
export const getProfiles = (name) => async (dispatch) => {
  // dispatch({ type: CLEAR_PROFILE });

  try {
    console.log(name,"name")
    const res = await axios.get(`/api/users/getusers/${name}`);

    console.log(res.data);
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    console.log('error');
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get  profgiles by id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    // console.log(userId);
    // console.log(`/api/profile/user/${userId}`);
    const res = await axios.get(`/api/profile/user/${userId}`);

    // console.log(res.data);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log('errssor');
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//clear profiles
export const clearfun = () => async (dispatch) => {
  console.log('yes')
  dispatch({type:CLEAR_PROFILE});
}

//get githubrepos
export const getGithubRepos = (username) => async (dispatch) => {
  // dispatch({type:CLEAR_PROFILE});

  try {
    const res = await axios.get(`/api/profile/github/${username}`);

    console.log(res.data);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    // console.log('error')
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


//ad d dolower like
export const follow = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/users/follow/${id}`);
    // dispatch({
    //   type: UPDATE_LIKES,
    //   payload: { id, likes: res.data },
    // });
  } catch (err) {
    console.log('errssor')
    // dispatch({
    //   type: POST_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status },
    // });
  }
};



// Create or update profile
// export const createProfile = (formData, history, edit = false) => async (
//   dispatch
// ) => {
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };

//     const res = await axios.post('/api/profile', formData, config);

//     dispatch({
//       type: GET_PROFILE,
//       payload: res.data,
//     });

//     dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

//     if (!edit) {
//       history.push('/dashboard');
//     }
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
//     }

//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

//add experience
// export const addExperience = (formData, history) => async (dispatch) => {
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };

//     const res = await axios.put('/api/profile/experience', formData, config);
//     console.log(res.data);
//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data,
//     });

//     dispatch(setAlert('Experience Added', 'success'));
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
//     }

//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

//add education
// export const addEducation = (formData, history) => async (dispatch) => {
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };

//     const res = await axios.put('/api/profile/education', formData, config);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data,
//     });

//     dispatch(setAlert('Education Added', 'success'));
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
//     }

//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

//delete experience
// export const deleteExperience = (id) => async (dispatch) => {
//   try {
//     const res = await axios.delete(`/api/profile/experience/${id}`);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data,
//     });
//     dispatch(setAlert('Experience Removed', 'success'));
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

//delete experience
// export const deleteEducation = (id) => async (dispatch) => {
//   try {
//     const res = await axios.delete(`/api/profile/education/${id}`);

//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data,
//     });
//     dispatch(setAlert('Education Removed', 'success'));
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

//delete account
// export const deleteAccount = () => async (dispatch) => {
//   if (window.confirm('Are you sure ? This cannot be undone')) {
//     try {
//       await axios.delete(`/api/profile`);

//       dispatch({
//         type: CLEAR_PROFILE,
//       });
//       dispatch({ type: DELETE_ACCOUNT });

//       dispatch(setAlert('Your account is Permanently deleted'));
//     } catch (err) {
//       dispatch({
//         type: PROFILE_ERROR,
//         payload: { msg: err.response.statusText, status: err.response.status },
//       });
//     }
//   }
// };
