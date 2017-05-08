import { combineReducers } from 'redux';
//import {reducer as formReducer} from 'redux-form';
import authReducer from './auth_reducer';
import postsReducer from './posts_reducer';
import { combineForms } from 'react-redux-form';

const initialUserState = {
  email: '',
  password: '',
  confirmPassword: ''
};

const initialPostState = {
  title: '',
  post: ''
};


const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  forms: combineForms({
                 userSignIn: initialUserState,
                 userSignUp: initialUserState,
                 addPost: initialPostState,
                 editPost: initialPostState
               }, 'forms')
});

export default rootReducer;
