import React, {Component} from "react";
import {singlePost, remove, like, unlike} from "./apiPost";
import DefaultPost from "../images/bballhoop.jpg";
import {Link, Redirect} from "react-router-dom";
import {isAuthenticated} from "../auth";
import Comment from "./Comment";

class SinglePost extends Component {
  state = {
    post: "",
    redirectToHome: false,
    redirectToSignin: false,
    like: false,
    likes: 0,
    comments: []
  };

  checkLike = (likes) => { // we will pass in the likes array which contains the userIds of all the users who have liked a post
    const userId = isAuthenticated() && isAuthenticated().user._id;
    let match = likes.indexOf(userId) !== -1; // checking to see if the userId is found in the likes array - note: the indexOf method returns -1 if the userId is not found
    return match; // match will be true if the userId is found, if not it will be false
  };

  componentDidMount = () => {
    const postId = this.props.match.params.postId;
    singlePost(postId).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({
          post: data,
          likes: data.likes.length,
          like: this.checkLike(data.likes),
          comments: data.comments
        });
      }
    });
  }; // checkLike is a method we are creating to see if the logged in user's ID is already in the likes array (meaning they have already liked the post) so that they can't like it twice - we pass in the likes array to this method

  updateComments = comments => {
    this.setState({ comments });
  }

  likeToggle = () => {
    if(!isAuthenticated()) {
      this.setState({redirectToSignin: true})
      return false; // so that the rest of the code isn't executed (if a user tries to like a post but isn't signed in)
    }
    let callApi = this.state.like ? unlike : like
    const userId = isAuthenticated().user._id
    const postId = this.state.post._id
    const token = isAuthenticated().token

    callApi(userId, token, postId).then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        this.setState({
          like: !this.state.like,
          likes: data.likes.length
        })
      }
    })
  }

  deletePost = () => {
    const postId = this.props.match.params.postId;
    const token = isAuthenticated().token
    remove(postId, token).then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        this.setState({redirectToHome: true})
      }
    })
  }

  deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete this post?") //creates a popup window in the browser with "OK" or "cancel" as the two options
    if(answer) {
      this.deletePost()
    }
  }

  renderPost = (post) => {
    const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ""
    const posterName = post.postedBy ? post.postedBy.name : " Unknown"

    const {like, likes} = this.state

    return ( // have to use return in order for this div to work
        <div className="card-body">
        <img src={`${
            process.env.REACT_APP_API_URL
            }/post/photo/${post._id}`}
            alt={post.title}
            onError={i =>
              (i.target.src = `${DefaultPost}`)
            }
            className="img-thumbnail mb-3"
            style={{height: "300px", width: "100%", objectFit: "cover"}}
          />

          {like ? (
            <h3 onClick={this.likeToggle}>
              {" "}
              {likes} Likes
            </h3>
          ) : (
            <h3 onClick={this.likeToggle}>
              {" "}
              {likes} Likes
            </h3>
          )}

          <p className="card-text">{post.body}</p>
          <br/>
          <p className="font-italic mark">
            Posted by <Link to={`${posterId}`}>{posterName}{" "}</Link>
            on {new Date(post.created).toDateString()}
          </p>
          <div className="d-inline-block">
            <Link to={`/`} className="btn btn-raised btn-primary btn-sm mr-5">
              Back to Posts
            </Link>

            {isAuthenticated().user &&
              isAuthenticated().user._id === post.postedBy._id && (
              <>
                <Link
                  to={`/post/edit/${post._id}`}
                  className="btn btn-raised btn-warning btn-sm mr-5"
                >
                  Update Post
                </Link>
                <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger"
                >
                  Delete Post
                </button>
              </>
            )}

            <div>
                {isAuthenticated().user &&
                    isAuthenticated().user.role === "admin" && (
                        <div class="card mt-5">
                            <div className="card-body">
                                <h5 className="card-title">Admin</h5>
                                <p className="mb-2 text-danger">
                                    Edit/Delete as an Admin
                                </p>
                                <Link
                                    to={`/post/edit/${post._id}`}
                                    className="btn btn-raised btn-warning btn-sm mr-5"
                                >
                                    Update Post
                                </Link>
                                <button
                                    onClick={this.deleteConfirmed}
                                    className="btn btn-raised btn-danger"
                                >
                                    Delete Post
                                </button>
                            </div>
                        </div>
                    )}
            </div>

          </div>
        </div>
    )
  }

  render() {
    const {post, redirectToHome, redirectToSignin, comments} = this.state;

    if(redirectToHome) {
      return <Redirect to={`/`}/>;
    } else if(redirectToSignin) {
      return <Redirect to={`/signin`}/>;
    }

    return (
      <div className="container">
        <h2 className="display-2 mt-5 mb-5">{post.title}</h2>

        {!post ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          this.renderPost(post)
        )} {/*if loading is true, shows Loading... screen, otherwise it does nothing*/}

        <Comment
          postId={post._id}
          comments={comments.reverse()}
          updateComments={this.updateComments}
        />
      </div>
    );
  }
}

export default SinglePost;
