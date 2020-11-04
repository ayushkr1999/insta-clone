import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types';

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts/user');
    // console.log(res.data)
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    // console.log('errssor')
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//update like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    // console.log('errssor')
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//updatREmove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${id}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    // console.log('errssor')
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete psot
export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert('POst Rmoved', 'succcess'));
  } catch (err) {
    // console.log('errssor')
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add psot
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post('/api/posts', formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post Created', 'succcess'));
  } catch (err) {
    // console.log('errssor')
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    // console.log('errssor')
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//add commect
export const addComment = (postId, data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  console.log(data,'formadata')

  const val={text:data}
  
  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      val,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: {id:postId, comment:res.data},
    });
    dispatch(setAlert('Comment Added', 'succcess'));
  } catch (err) {
    // console.log('errssor')
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete commect
export const deleteComment = (postId, commentId) => async (dispatch) => {
  // const config={
  //     headers:{
  //         'Content-Type':'application/json'
  //     }
  // }

  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert('Comment Removed', 'success'));
  } catch (err) {
    // console.log('errssor')
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
