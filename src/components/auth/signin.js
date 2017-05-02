import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions/index';
import {connect} from 'react-redux';


class SignIn extends Component {
  handleFormSubmit({email, password}) {
    this.props.signInUser({email, password});
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Ooops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email</label>
          <Field className="form-control" name="email" component="input" type="email"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Password</label>
          <Field className="form-control" name="password" component="input" type="password"/>
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    );
  }
}

SignIn = reduxForm({
  form: 'SignInForm'
})(SignIn);

function mapStateToProps(state) {
  return {errorMessage: state.auth.error};

}

export default connect(mapStateToProps, actions)(SignIn);