import {browserHistory} from 'react-router';
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, CREATE_POST, POST_ADDED, FAIL_ADD_POST, FETCH_POSTS} from './types';
import firebase from 'firebase';

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


export function addPost(props) {
  return dispatch => {
    const postId ="post:" + Math.random().toString(36).substr(2, 9);
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
