import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';
import AddPost from './components/addPost';
import postList from './components/postList';
import Post from './components/post';
import EditPost from './components/updatePost';


import reducers from './reducers';
import * as actions from './actions/index';

//add redux devTools
const store = createStore(
  reducers,
  compose (
    applyMiddleware(reduxThunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// const store = createStoreWithMiddleware(reducers);

store.dispatch(actions.verifyAuth());

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={postList}/>
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/add-post" component={AddPost} />
        <Route path="posts/:id" component={Post} />
        <Route path="/post/edit-post" component={EditPost} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));