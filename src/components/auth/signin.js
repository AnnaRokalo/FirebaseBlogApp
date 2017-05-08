import React, {Component} from 'react';
import {signInUser} from '../../actions/index';
import {connect} from 'react-redux';
import { Control, Form, Fieldset, Errors } from 'react-redux-form';


const required = (val) => val && val.length;


class SignIn extends Component {

  handleSubmit(user) {
    this.props.signInUser(user);
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Error: </strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    return (
      <Form model="forms.userSignIn"
            onSubmit={(user) => this.handleSubmit(user)}
            form="signInForm" >
        <div className="form-group">
          <label>Email:</label>
          <Control.text type="email"
                        model=".email"
                        className="form-control"
                        validators={{
                          required,
                          validEmail: (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)}} />
          <Errors
            className="text-danger"
            model=".email"
            show="touched"
            messages={{
              required: 'Please, enter the email.',
              validEmail: 'Invalid email address',
            }}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <Control type="password"
                   model=".password"
                   className="form-control"
                   validators={{
                     required}} />
          <Errors
            className="text-danger"
            model=".password"
            show="touched"
            messages={{
              required: 'Please, enter the password.'
            }}
          />
        </div>
        {this.renderAlert()}
        <button type="submit" className="btn btn-primary">
          SignIn
        </button>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

export default connect(mapStateToProps, {signInUser})(SignIn);