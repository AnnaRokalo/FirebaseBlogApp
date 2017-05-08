import React, {Component} from 'react';
import { Control, Form, Errors, actions } from 'react-redux-form';
import {signUpUser} from '../../actions';
import {connect} from 'react-redux';


const required = (val) => val && val.length;

const passwordsMatch = ({ password, confirmPassword }) => {
  return password === confirmPassword;
};

class SignUp extends Component {
  handleFormSubmit(formProps) {
    console.log("signUp");
    this.props.signUpUser(formProps);
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
    return (
      <Form model="forms.userSignUp"
            onSubmit={(user) => this.handleFormSubmit(user)}
            form="signUpForm"
            validators={{
              '': { passwordsMatch }
            }}
      >
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
        <div className="form-group">
          <label>Confirm Password:</label>
          <Control type="password"
                   model=".confirmPassword"
                   className="form-control"
                   validators={{
                     required
                   }} />
          <Errors
            className="text-danger"
            model=".confirmPassword"
            show="touched"
            messages={{
              required: 'Please, enter the password.'
            }}
          />
        </div>
        {this.renderAlert()}
        <Errors
          className="alert alert-danger"
          model="forms.userSignUp"
          show="touched"
          messages={{
            passwordsMatch: "Passwords doesn't match."
          }}
        />
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error
  };
}

export default connect(mapStateToProps, {signUpUser})(SignUp);