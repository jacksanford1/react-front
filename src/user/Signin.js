import React, {Component} from 'react';
import { Link, Redirect } from "react-router-dom"; // this allows us to use Redirect in JSX below to redirect to different pages (using to redirect to homepage after successful signin)
import {signin, authenticate} from "../auth"
import SocialLogin from "./SocialLogin";

class Signin extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferrer: false, // lets you know if we can redirect you to the homepage after login
      loading: false // this shows a little loading screen while the API is being called, etc.
    }
  }

  handleChange = (name) => (event) => {
    this.setState({error: ""})
    this.setState({[name]: event.target.value}) // this works for name, email and password, not just name
  };


  clickSubmit = event => {
    event.preventDefault() // stops default behavior of refreshing the browser on a click
    this.setState({loading: true})
    const {email, password} = this.state // makes it so that we don't have to write this.state.name every time in this function, can just write name
    const user = { // whatever are the state values of name, email, etc. are what we are saving as the current user's values in the key/value pairs below
      email, // key and value are the same for these so don't need to write twice
      password
    }
    console.log(user)
    signin(user)
    .then(data => {
      if(data.error) { // this is apparently how you deal with errors, we have a state object we can display which will show the error
        this.setState({error: data.error, loading: false}) // saves the error in our state, also changes the screen back from the Loading screen
      } else {
        // authenticate user
        authenticate(data, () => { // authenticate is a method we have created
          this.setState({redirectToReferrer: true}) // setting to true because the user is authenticated now (we know because no errors), don't need to reset loading down here because you already get redirected to a different page
        })
      }
    })
  }


  signinForm = (email, password) => (
    <form>
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
        <label className="text-muted">Password</label> {/*text muted means it will look a little grayed out*/}
        <input
        onChange={this.handleChange("password")}
        type="password"
        className="form-control"
        value={password}
        />
      </div>
      <button onClick={this.clickSubmit} className="btn btn-raised btn-primary"> {/*makes the button look nice*/}
        Submit
      </button>
    </form>
  )

  render() {
    const {email, password, error, redirectToReferrer, loading} = this.state // this destructures the this.state calls we would use below so we don't have to write this.state.name every time

    if(redirectToReferrer) { // redirectToReferrer will be true or false
      return <Redirect to="/" /> // this Redirect method works thanks to reactDOM
    }

    return (
      <div className="container"> {/*every jsx code block needs to be wrapped in a single div*/}
        <h2 className="mt-5 mb-5">Signin</h2> {/*mt and mb are styling in order to give padding to margin top and bottom*/}

        <hr />
           <SocialLogin />
        <hr />

        <div className="alert alert-danger" style={{display: error ? "" : "none"}}> {/*This is for error alerts, style asks if there's an error, if not it won't show the error bar formatting on the page*/}
          {error}
        </div>

        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          ""
        )} {/*if loading is true, shows Loading... screen, otherwise it does nothing*/}

        {this.signinForm(email, password)}
        <p>
           <Link to="/forgot-password" className="text-danger">
               {" "}
               Forgot Password
           </Link>
        </p>
      </div>
    );
  }
}

export default Signin
