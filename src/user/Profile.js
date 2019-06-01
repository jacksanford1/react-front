import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import { read } from "./apiUser";
import DefaultProfile from '../images/avatar.jpg';
import DeleteUser from './DeleteUser';
import FollowProfileButton from './FollowProfileButton';
import ProfileTabs from './ProfileTabs'
import {listByUser} from '../post/apiPost'

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: { following : [], followers: [] },
      redirectToSignin: false,
      following: false,
      error: "",
      posts: []
    };
  }

  // check to see if you're already following a person
  checkFollow = user => { // takes user as an argument because we will be pulling the list this user follows
    const jwt = isAuthenticated()
    const match = user.followers.find(follower => {
      // one id has many other ids (followers) and vice versa
      return follower._id === jwt.user._id;
    });
    return match;
  };

  clickFollowButton = callApi => { // when you click the follow or unfollow button, this function sends the info to the backend (callApi is just a made-up variable) and updates the state; this method will be executed through the style component
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;

    callApi(userId, token, this.state.user._id).then(data => { // response from follow method in apiUser is handled by this function (?)
      if(data.error) {
        this.setState({error: data.error});
      } else {
        this.setState({user: data, following: !this.state.following}); // whether you were currently following or unfollowing, this does the opposite
      }
    });
  };

  init = (userId) => {
    const token = isAuthenticated().token
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true }); // redirects them to the signin page (because that's the only way you can have an error here I guess - is if you're not signed in)
      } else {
        let following = this.checkFollow(data); // following will be either true or false
        this.setState({user: data, following}); // key value is the same for following so only writing once
        this.loadPosts(data._id)
      }
    });
  };

  loadPosts = userId => {
    const token = isAuthenticated().token
    listByUser(userId, token).then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        this.setState({posts: data})
      }
    })
  }

  componentDidMount() {
    const userId = this.props.match.params.userId; // no clue why this works
    this.init(userId); // gives the userId to the init method
  }

  componentWillReceiveProps(props) { // apparently these props are available due to react-router-dom
    const userId = props.match.params.userId; // no clue why this works
    this.init(userId); // gives the userId to the init method
  }


  render() {
    const {redirectToSignin, user, posts} = this.state
    if(redirectToSignin) return <Redirect to="/signin" /> // if it's true that the user needs to be redirected, this Redirect method from react-router-dom will take them to the right page

    // process.env doesn't seem to work for me in most places, keeping it here for now
        const photoUrl = user._id
          ? `${
            process.env.REACT_APP_API_URL
          }/user/photo/${user._id}?{new Date().getTime()}`
          : DefaultProfile;

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Profile</h2> {/*mt and mb are styling in order to give padding to margin top and bottom*/}
        <div className="row"> {/*row and col-md-6 made it so that info in this section was split into two different columns*/}
          <div className="col-md-4">
            <img
              style={{height: "200px", width: 'auto'}}
              className="img-thumbnail"
              src={photoUrl}
              onError={i => (i.target.src = `${DefaultProfile}`)}
              alt={user.name}
              />
          </div>
          <div className="col-md-8">
            <div className="lead mt-2">
              <p>Hello {user.name}</p> {/*works because this function isAuthenticated returns a json response of the jwt token in local storage */}
              <p>Email:  {user.email}</p> {/*works because this function isAuthenticated returns a json response of the jwt token in local storage */}
              <p>{`Joined ${new Date(
                user.created
              ).toDateString()}`}</p> {/*tells you when the user created their profile*/}
            </div>
            {isAuthenticated().user && isAuthenticated().user._id === user._id ? (
              <div className="d-inline-block">
              <Link
              className="btn btn-raised btn-info mr-5"
              to={`/post/create`}
              >
                Create Post
              </Link>

              <Link
                className="btn btn-raised btn-success mr-5"
                to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>
                <DeleteUser userId={user._id}/> {/*allows us to access userId in the DeleteUser component (pretty crazy)*/}
              </div>
            ) : (
              <FollowProfileButton
                following={this.state.following}
                onButtonClick={this.clickFollowButton}
              />
            )}

          </div>{/*checks to see if a user is logged in and if a user matches the current logged in user (so they can edit their profile) (otherwise it lets you see follow/unfollow button for other users' profiles)*/}
        </div>
        <div className="row">
          <div className="col md-12 mt-5 mb-5">
            <hr/>
            <p className="lead">{user.about}</p>
            <hr/>

            <ProfileTabs
              followers={user.followers}
              following={user.following}
              posts={posts}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile
