import {CREATE_POST, POST_ADDED, FAIL_ADD_POST, FETCH_POSTS} from '../actions/types';

export default function(state = {all: [] }, action) {
  switch(action.type) {
    case FETCH_POSTS:
      console.log('Posts reducer fetch posts');
      let newState = [];
      for( let i in action.payload ) {
        if (action.payload.hasOwnProperty(i)){
          newState.push(action.payload[i]);
        }
      }
      console.log("payload to array");
      console.log(newState);
      return {
        ...state,
        all: newState
      };


    default:
      return state;
  }
}