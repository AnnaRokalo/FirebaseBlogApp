import {FETCH_POSTS, FETCH_POST} from '../actions/types';

export default function(state = {all: [], post: null }, action) {
  switch(action.type) {
    case FETCH_POSTS:
      let newState = [];
      for( let i in action.payload ) {
        if (action.payload.hasOwnProperty(i)){
          newState.push(action.payload[i]);
        }
      }
      return {
        ...state,
        all: newState
      };

    case FETCH_POST:
      return {
        ...state,
        post: action.payload
      };

    default:
      return state;
  }
}