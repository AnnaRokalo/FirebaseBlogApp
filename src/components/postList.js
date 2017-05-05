import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchPosts} from "../actions/index";
import {Link} from 'react-router';

class postList extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    if(this.props.posts.all.length) {
      return this.props.posts.all.map((post) => {
        return (
          <div className="col-xs-6 col-md-4" key={post.postId}>
            <Link to={ "posts/" + post.postId }>
              <div className="thumbnail">
                <img src={post.previewUrl ? post.previewUrl : '../images/default-wallpaper.jpg'} alt="Wallpaper"/>
                <h3>{post.title}</h3>
                {/*<p><a href="#" className="btn btn-primary" role="button">Перейти</a></p>*/}
              </div>
            </Link>
          </div>
        );
      });
    }
    else return (
      <div className="col-xs-12">
        <span className=" text-warning"> There is no posts yet</span>
      </div>
    );

  }

  render() {
    return (
      <div className="row">
        {this.renderPosts()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

export default connect(mapStateToProps, {fetchPosts})(postList);