import React, {Component} from 'react';
import { isAuthenticated } from '../auth';
import {create} from './apiPost';
import {Redirect} from 'react-router-dom'
import DefaultProfile from '../images/avatar.jpg'

class NewPost extends Component {

  constructor() {
    super()
    this.state = {
      title: "",
      body: "",
      photo: "",
      error: "",
      user: {},
      fileSize: 0,
      loading: false,
      redirectToProfile: false
    }
  }

  componentDidMount() {
    this.postData = new FormData();
    this.setState({user: isAuthenticated().user})
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
      const userId = isAuthenticated().user._id; // grabbing user ID from local storage
      const token = isAuthenticated().token;

      create(userId, token, this.postData).then(data => {
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

  newPostForm = (title, body) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Profile Photo</label> {/*text muted means it will look a little grayed out*/}
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
        Create Post
      </button>
    </form>
  );

  render() {
    const {
      title,
      body,
      photo,
      user,
      error,
      loading,
      redirectToProfile
    } = this.state; // this destructures the this.state calls we would use below so we don't have to write this.state.name every time

    if(redirectToProfile) {
      return <Redirect to={`/user/${user._id}`}/>
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Create a new post</h2> {/*mt and mb are styling in order to give padding to margin top and bottom*/}
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

        {this.newPostForm(title, body)}
      </div>
    );
  }
}

export default NewPost
