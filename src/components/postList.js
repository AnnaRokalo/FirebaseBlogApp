import React, {Component} from 'react';
import { connect } from 'react-redux';

class postList extends Component {
  renderPosts() {
    return this.props.posts.map((post) => {
      return (
        <div className="col-xs-6 col-md-4" key={post.id}>
          <div className="thumbnail">
            <a href="#"><img src={post.previewUrl} alt="Wallpaper"/></a>
            <h3>{post.title}</h3>
            <p><a href="#" className="btn btn-primary" role="button">Перейти</a></p>
          </div>
        </div>
      );
    });
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
  return { posts: state.posts };
}


export default connect(mapStateToProps, null)(postList);