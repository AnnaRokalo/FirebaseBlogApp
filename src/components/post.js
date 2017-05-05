import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {fetchPost, deletePost} from '../actions/index';
import {Link} from 'react-router';

class PostDetail extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick() {
    this.props.deletePost(this.props.params.id);
    this.context.router.push('/'); //переход на главную страницу после удаления
  }

  render() {
    const {post} = this.props;
    const userUid = 123;
    if(!post) {
      return (
        <div>
          <div className="row">
            <div className="col-xs-2">
              <Link to="/" className="">Back to Posts</Link>
            </div>
          </div>

          <div>Loading...</div>
        </div>);
    }
    return (
      <div>
        <div className="row">
          <div className="col-xs-2">
            <Link to="/" className="">Back to Posts</Link>
          </div>
          <div className="col-xs-1 col-xs-offset-8">
            <Link className="nav-link" to="/post/edit-post">Edit</Link>
            <button onClick={this.onDeleteClick.bind(this)}
                    className="btn btn-danger pull-xs-right">
              Delete post
            </button>
          </div>
        </div>
        <h3>{post.title}</h3>
        <p>{post.data}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostDetail);

