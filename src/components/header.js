import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

class Header extends Component {
  handleSignOut() {
    this.props.signOutUser();
  }

  renderLinks() {
    if(this.props.authenticated) {
      return ([
        <li className="nav-item" key={3}>
          <Link className="nav-link" to="/add-post">Add Story</Link>
        </li>,
        <li className="nav-item" key={4}>
          <Link to="/" className="nav-link" onClick={this.handleSignOut.bind(this)}>Sign Out</Link>
        </li>
        ]
      );
    }
    else {
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin">Sign In</Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign Up</Link>
        </li>
      ];
    }
  }

  render() {
    return (
      <div className="header">
        <nav className="navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                <span className="logo-text">Stories</span>
              </a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              {this.renderLinks()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps, actions)(Header);