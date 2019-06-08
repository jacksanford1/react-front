import React, { Component } from 'react';
import {singlePost, update} from "./apiPost";
import {isAuthenticated} from "../auth"
import {Redirect} from 'react-router-dom'
import DefaultPost from '../images/bballhoop.jpg'


class EditPost extends Component {
  constructor() {
    super()
    this.state = {
      id: "",
      title: "",
      body: "",
      redirectToProfile: false,
      error: "",
      fileSize: 0,
      loading: false
    }
  }

  init = postId => {
      singlePost(postId).then(data => {
          if (data.error) {
              this.setState({ redirectToProfile: true });
          } else {
              this.setState({
                  // id is not post.postedBy._id
                  id: data.postedBy._id,
                  title: data.title,
                  body: data.body,
                  error: ""
              });
          }
      });
  };

  componentDidMount() {
    this.postData = new FormData();
    const postId = this.props.match.params.postId;
    this.init(postId)
  }

  isValid = () => {
    const { title, body, fileSize } = this.state;
    if (fileSize > 100000) {
      this.setState({ error: "File size should be less than 100kb" });
      return false;
    } // 1MB is 100000 above
    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are required", loading: false });
      return false;
    }
    return true;
  };

  handleChange = name => event => {
    this.setState({ error: ""});
    const value =
      name === 'photo' ? event.target.files[0] : event.target.value; // if it's a photo, put it in event.target.files, if not, just put it in event.target.value like normal

    const fileSize = name === 'photo' ? event.target.files[0].size : 0; // checks for the image size, if it's not there, returns 0
    this.postData.set(name, value); // setting the value of a key value pair to have whatever the name of the field is that comes through (name, email, etc.)
    this.setState({ [name]: value, fileSize }); // this works for name, email and password, not just name, fileSize would be fileSize: fileSize but don't need to repeat since same word
  };

  clickSubmit = event => {
    event.preventDefault(); // stops default behavior of refreshing the browser on a click
    this.setState({loading: true})

    if (this.isValid()) {
      const postId = this.state.id;
      const token = isAuthenticated().token;

      update(postId, token, this.postData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else {
          this.setState({
            loading: false,
            title: "",
            body: "",
            photo: "",
            redirectToProfile: true
          })
        }
      });
    }
  };

  editPostForm = (title, body) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Post Photo</label> {/*text muted means it will look a little grayed out*/}
        <input
          onChange={this.handleChange("photo")}
          type="file"
          accept="image/*"
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Title</label> {/*text muted means it will look a little grayed out*/}
        <input
          onChange={this.handleChange("title")}
          type="text"
          className="form-control"
          value={title}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Body</label> {/*text muted means it will look a little grayed out*/}
        <textarea
          onChange={this.handleChange("body")}
          type="text"
          className="form-control"
          value={body}
        />
      </div>
      <button
        onClick={this.clickSubmit}
        className="btn btn-raised btn-primary"
      > {/*makes the button look nice*/}
        Update Post
      </button>
    </form>
  );

  render() {
    const {id, title, body, redirectToProfile, error, loading} = this.state

    if(redirectToProfile) {
      return <Redirect to={`/user/${isAuthenticated().user._id}`}/>
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">{title}</h2>

        <div className="alert alert-danger" style={{display: error ? "" : "none"}}> {/*This is for error alerts, style asks if there's an error, if not it won't show the error bar formatting on the page*/}
          {error}
        </div>

        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )}

        <img
          style={{height: "200px", width: 'auto'}}
          className="img-thumbnail"
          src={`${
            process.env.REACT_APP_API_URL
          }/post/photo/${id}?{new Date().getTime()}`}
          onError={i => (i.target.src = `${DefaultPost}`)}
          alt={title}
        />

        {this.editPostForm(title, body)}
        {isAuthenticated().user.role === "admin" ||
    (isAuthenticated().user._id === id &&
        this.editPostForm(title, body))}
      </div>
    );
  }
}

export default EditPost
