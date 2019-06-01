import React, {Component} from 'react';
import {signup} from '../auth'; // if you use index as your file name, it finds it automatically
import {Link} from 'react-router-dom';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false
    };
  }

  handleChange = name => event => {
    this.setState({error: ""})
    this.setState({[name]: event.target.value}) // this works for name, email and password, not just name
  };

  clickSubmit = event => {
    event.preventDefault() // stops default behavior of refreshing the browser on a click
    const {name, email, password} = this.state ;// makes it so that we don't have to write this.state.name every time in this function, can just write name
    const user = { // whatever are the state values of name, email, etc. are what we are saving as the current user's values in the key/value pairs below
      name, // key and value are the same for these so don't need to write twice
      email,
      password
    };
    // console.log(user)
    signup(user).then(data => {
      if (data.error) this.setState({error: data.error});
        else
          this.setState({ // here we have already captured the user in the database so we are resetting all the state values
            error: "",
            name: "",
            email: "",
            password: "",
            open: true
        })
    })
  }


  signupForm = (name, email, password) => (
    <form>
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
        Submit
      </button>
    </form>
  );

  render() {
    const {name, email, password, error, open} = this.state; // this destructures the this.state calls we would use below so we don't have to write this.state.name every time
    return (
      <div className="container"> {/*every jsx code block needs to be wrapped in a single div*/}
        <h2 className="mt-5 mb-5">Signup</h2> {/*mt and mb are styling in order to give padding to margin top and bottom*/}

        <div
          className="alert alert-danger"
          style={{display: error ? "" : "none"}}
        > {/*This is for error alerts, style asks if there's an error, if not it won't show the error bar formatting on the page*/}
          {error}
        </div>

        <div
          className="alert alert-info"
          style={{display: open ? "" : "none"}}
        > {/*This is for error alerts, style asks if there's an error, if not it won't show the error bar formatting on the page*/}
          New account is successfully created. Please <Link to='/signin'>Sign In</Link>
        </div>
        {this.signupForm(name, email, password)}
      </div>
    );
  }
}

export default Signup
