import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';
import { Link } from 'react-router-dom';
import { deletePost } from '../actions';
import CommentsList from './comments_list';

class PostsShow extends Component {
  componentDidMount(){
    if (!this.props.post){ //cache records. don't update if there is a post
      const { id } = this.props.match.params;
      this.props.fetchPost(id);
    }
  }

  onDeleteClick(){
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render(){
    const { post } = this.props;

    if (!post){
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back to Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
        <CommentsList />
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps){
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);