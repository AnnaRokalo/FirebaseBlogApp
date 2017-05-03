import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions/index';
import {connect} from 'react-redux';


class AddPost extends Component {
  handleFormSubmit({title, post}) {
    console.log("hello from add post");
    console.log(title + '\n' +post);
    //this.props.signInUser({email, password});
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Title</label>
          <Field className="form-control" name="title" component="input" type="text"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Story</label>
          <Field className="form-control" name="post" component="textarea" />
        </fieldset>
        <button action="submit" className="btn btn-primary">Add</button>
      </form>
    );
  }
}

AddPost = reduxForm({
  form: 'AddPostForm'
})(AddPost);

function mapStateToProps(state) {
  return {};

}

export default connect(mapStateToProps, actions)(AddPost);