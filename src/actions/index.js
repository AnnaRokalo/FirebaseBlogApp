import {browserHistory} from 'react-router';
import firebase from 'firebase';

import {AUTH_USER,
        UNAUTH_USER,
        AUTH_ERROR,
        CREATE_POST,
        POST_ADDED,
        FAIL_ADD_POST,
        FETCH_POSTS,
        FETCH_POST,
        FAIL_DELETE_POST,
        DELETE_POST} from './types';


const configFirebase = {
  apiKey: "AIzaSyCC23-AwqG60zSCNLKGmpKhp7tuWusDWeg",
  authDomain: "fir-blogapp-f7c51.firebaseapp.com",
  databaseURL: "https://fir-blogapp-f7c51.firebaseio.com",
  projectId: "fir-blogapp-f7c51",
  storageBucket: "fir-blogapp-f7c51.appspot.com",
  messagingSenderId: "146885387991"
};

firebase.initializeApp(configFirebase);

export function signUpUser({email, password}) {
  return function(dispatch) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(response => {
        dispatch(authUser());
        browserHistory.push('/');
      })
      .catch(error => {
        dispatch(authError(error.message));
        let errorMsg = error.message;
        console.log(errorMsg);
      });
  }
}

export function signInUser({email, password}) {
  console.log("Hello from signIn! Email: " + email + "; password: " + password);
  //Submit email/password to the server

  return function (dispatch) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
        dispatch(authUser());
        browserHistory.push('/');
      })
      .catch(error => {
         dispatch(authError(error.message));
        let errorMsg = error.message;
        console.log(errorMsg);
      });
  }
}

export function signOutUser() {
  browserHistory.push('/');

  return {
    type: UNAUTH_USER
  }
}

export function verifyAuth() {
  return function (dispatch) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser());
      } else {
        dispatch(signOutUser());
      }
    });
  }
}

export function authUser() {
  return {
    type: AUTH_USER
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

// Posts
export function fetchPosts() {
  return dispatch => {
    firebase.database().ref('/posts').on('value', snapshot => {
      dispatch({
        type: FETCH_POSTS,
        payload: snapshot.val()
      })
    });
  }
}

export function createPost(props) {
  return dispatch => {
    const postId = Math.random().toString(36).substr(2, 9);
    const postsRef = firebase.database().ref('posts/' + postId);
    const userUid = firebase.auth().currentUser.uid;
    postsRef.set({
      postId,
      title: props.title,
      data: props.post,
      author: userUid
    }).then(() => {
      dispatch({
        type: POST_ADDED
      });
    }).catch((error) => {
      dispatch({
        type: FAIL_ADD_POST,
        payload: error.message
      });
    });
  }
}

export function fetchPost(id) {
  return dispatch => {
    firebase.database().ref('posts/' + id).once('value', snapshot => {
      dispatch({
        type: FETCH_POST,
        payload: snapshot.val()
      })
    });
  }
}

export function deletePost(id) {
  console.log("deleting post");
  return dispatch => {
    const delPostRef = firebase.database().ref('posts/' + id);
    delPostRef.remove()
      .then(() => {
        console.log("deleting post is successful");
        dispatch({
          type: DELETE_POST
        })})
      .catch((error) => {
        dispatch({
          type: FAIL_DELETE_POST,
          payload: error.message
        });
      });
  }
}
