import React, {Component} from 'react';
import { connect } from 'react-redux';
import {fetchPosts} from "../actions/index";

class postList extends Component {
  componentWillMount() {
    console.log("log from componentWillMount");
    this.props.fetchPosts();
  }

  renderPosts() {
    console.log("\n Render posts");
    console.log(this.props.posts);

    if(this.props.posts.all.length) {
      console.log("if there is not empty object");
      return this.props.posts.all.map((post) => {
        return (
          <div className="col-xs-6 col-md-4" key={post.postId}>
            <div className="thumbnail">
              <a href="#"><img src='' alt="Wallpaper"/></a>
              <h3>{post.title}</h3>
              <p><a href="#" className="btn btn-primary" role="button">Перейти</a></p>
            </div>
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