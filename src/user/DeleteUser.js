import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import { isAuthenticated } from '../auth'; // this will give us the authentication token
import { remove } from './apiUser'; // this removes the user from the database
import { signout } from '../auth'; // this logs the user out and clears the local storage

class DeleteUser extends Component {
  state = { // don't need constructor or super method here, just using state
    redirect: false
  }

  deleteAccount = () => {
    const token = isAuthenticated().token; // grabs the token from the local storage jwt info that is returned by isAuthenticated method
    const userId = this.props.userId // if you look at where DeleteAccount is used in the Profile file, we passed userId in as a prop to this function
    remove(userId, token) // apparently this is a function that requires the userId and the token in order to execute a delete of a profile
    .then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        //signout user
        signout(() => console.log("User is deleted")) // this is weird - signout method requires a function as an argument, so we just gave it a console.log function to keep it busy (?)
        //redirect
        this.setState({redirect: true})
      }
    })
  }

  deleteConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete your account?") //creates a popup window in the browser with "OK" or "cancel" as the two options
    if(answer) {
      this.deleteAccount()
    }
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to="/"/>
    }
    return (
      <button
        onClick={this.deleteConfirmed}
        className="btn btn-raised btn-danger">
        Delete Profile
      </button>
    );
  }
}

export default DeleteUser
