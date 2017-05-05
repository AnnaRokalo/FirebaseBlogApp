import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {updatePost} from '../actions/index';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';


class EditPost extends Component {
  handleFormSubmit({title, post}) {
    this.props.updatePost({title, post, postId: this.props.post.postId});
    browserHistory.push('/');
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Title</label>
          <Field className="form-control" name="title" component="input" type="text" value="My title" />
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

EditPost = reduxForm({
  form: 'AddPostForm'
})(EditPost);

function mapStateToProps(state) {
  return { post: state.posts.post };
}


export default connect(mapStateToProps, {updatePost})(EditPost);