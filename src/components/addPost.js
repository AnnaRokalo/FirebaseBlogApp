import React, {Component} from 'react';
import { Control, Form, Errors } from 'react-redux-form';
import {createPost} from '../actions/index';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

const required = (val) => val && val.length;


class AddPost extends Component {
  handleFormSubmit({title, post}) {
    this.props.createPost({title, post});
    browserHistory.push('/');
  }



  render() {
    return (
      <Form model="forms.addPost"
            onSubmit={(formProps) => this.handleFormSubmit(formProps)}
            form="addPostForm">
        <div className="form-group">
          <label>Title</label>
          <Control.text
            model=".title"
            className="form-control"
            validators={{
              required
            }}/>
          <Errors
            className="text-danger"
            model=".title"
            show="touched"
            messages={{
              required: 'Please, enter the title.'
            }}
          />
        </div>
        <div className="form-group">
          <label>Story</label>
          <Control.textarea
            model=".post"
            className="form-control"
            validators={{
              required
            }}/>
          <Errors
            className="text-danger"
            model=".post"
            show="touched"
            messages={{
              required: 'Please, enter the password.'
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </Form>
    );
  }
}


export default connect(null, {createPost})(AddPost);