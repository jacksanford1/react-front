import React, {Component} from 'react';
import { isAuthenticated } from '../auth';
import {read, update, updateUser} from './apiUser';
import {Redirect} from 'react-router-dom'
import DefaultProfile from '../images/avatar.jpg'

class EditProfile extends Component {

  constructor() {
    super()
    this.state = {
      id: "",
      name: "",
      email: "",
      password: "",
      redirectToProfile: false,
      error: "",
      fileSize: 0,
      loading: false,
      about: ""
    }
  }

  init = (userId) => {
    const token = isAuthenticated().token
    read(userId, token)
    .then(data => {
      if(data.error) {
        this.setState({redirectSignin: true}) // redirects them to the signin page (because that's the only way you can have an error here I guess - is if you're not signed in)
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          error: "",
          about: data.about
        })
      }
    });
  }

  componentDidMount() {
    this.userData = new FormData()
    const userId = this.props.match.params.userId; // no clue why this works
    this.init(userId) // gives the userId to the init method
  }

  isValid = () => {
    const { name, email, password, fileSize } = this.state;
    if (fileSize > 100000) {
      this.setState({ error: "File size should be less than 100kb" });
      return false;
    } // 1MB is 100000 above
    if (name.length === 0) {
      this.setState({ error: "Name is required", loading: false });
      return false;
    }
    // email@domain.com
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({error: "A valid email is required", loading: false})
      return false
    }
    if(password.length >= 1 && password.length <=5) {
      this.setState({error: "Password must be at least 6 characters long", loading: false});
      return false
    }
    return true;
  };

  handleChange = name => event => {
    this.setState({ error: ""});
    const value =
      name === 'photo' ? event.target.files[0] : event.target.value; // if it's a photo, put it in event.target.files, if not, just put it in event.target.value like normal

    const fileSize = name === 'photo' ? event.target.files[0].size : 0; // checks for the image size, if it's not there, returns 0
    this.userData.set(name, value); // setting the value of a key value pair to have whatever the name of the field is that comes through (name, email, etc.)
    this.setState({ [name]: value, fileSize }); // this works for name, email and password, not just name, fileSize would be fileSize: fileSize but don't need to repeat since same word
  };

  clickSubmit = event => {
    event.preventDefault(); // stops default behavior of refreshing the browser on a click
    this.setState({loading: true})

    if (this.isValid()) {
      const userId = this.props.match.params.userId; // no clue why this works
      const token = isAuthenticated().token;

      update(userId, token, this.userData).then(data => {
        if (data.error) this.setState({ error: data.error });
        else
          updateUser(data, () => {
            this.setState({
              redirectToProfile: true // tells us that it's now ok to redirect the user to their updated profile page
            });
          })

      });
    }
  };

  signupForm = (name, email, password, about) => (
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
        <label className="text-muted">Name</label> {/*text muted means it will look a little grayed out*/}
        <input
          onChange={this.handleChange("name")}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label> {/*text muted means it will look a little grayed out*/}
        <input
          onChange={this.handleChange("email")}
          type="email"
          className="form-control"
          value={email}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">About</label> {/*text muted means it will look a little grayed out*/}
        <textarea
          onChange={this.handleChange("about")}
          type="text"
          className="form-control"
          value={about}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label> {/*text muted means it will look a little grayed out*/}
        <input
          onChange={this.handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
      </div>
      <button
        onClick={this.clickSubmit}
        className="btn btn-raised btn-primary"
      > {/*makes the button look nice*/}
        Update
      </button>
    </form>
  );

  render() {
    const {
      id,
      name,
      email,
      password,
      redirectToProfile,
      error,
      loading,
      about
    } = this.state; // this destructures the this.state calls we would use below so we don't have to write this.state.name every time

    if(redirectToProfile) {
      return <Redirect to={`/user/${id}`}/>
    }
// process.env doesn't seem to work for me in most places, keeping it here for now
    const photoUrl = id
      ? `${
        process.env.REACT_APP_API_URL
      }/user/photo/${id}?{new Date().getTime()}`
      : DefaultProfile;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2> {/*mt and mb are styling in order to give padding to margin top and bottom*/}
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
          src={photoUrl}
          onError={i => (i.target.src = `${DefaultProfile}`)}
          alt={name}
          />

        {this.signupForm(name, email, password, about)}
      </div>
    );
  }
}

export default EditProfile
