import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import {connect} from 'react-redux';

class SignUp extends Component {
  handleFormSubmit(formProps) {
    this.props.signUpUser(formProps);
  }

  renderField({ input, label, type, meta: { touched, error } }) {
    return (
      <fieldset className="form-group">
        <label>{label}</label>
        <input  {...input} className="form-control" placeholder={label} type={type}/>
        {touched && error && <div className="error">{error}</div> }
      </fieldset>
    );
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
        <Field name="email" label="email" component={this.renderField} type="email"/>
        <Field name="password" label="password" component={this.renderField}  type="password"/>
        <Field name="confirmPassword" label="confirmPassword" component={this.renderField} type="password"/>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if(!formProps.email)
    errors.email = 'Please enter an email';
  if(!formProps.password)
    errors.password = 'Please enter a password';
  if(!formProps.confirmPassword)
    errors.confirmPassword = 'Please enter a password confirmation';
  if(formProps.password !== formProps.confirmPassword)
    errors.password = 'Passwords must match';

  return errors;
}

SignUp = reduxForm({
  form: 'SignUpForm',
  validate
})(SignUp);

function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

export default connect(mapStateToProps, actions)(SignUp);