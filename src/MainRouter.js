// This file is for routing to all the different pages
import React from 'react' // need this in order to use React
import {Route, Switch} from 'react-router-dom' // package we installed which will help with routing
import Home from './core/Home' // importing this component (and others soon) in order to route to them
import Menu from './core/Menu' // this is for the Menu bar on every screen
import Signup from './user/Signup' // importing this component (and others soon) in order to route to them
import Signin from './user/Signin' // importing this component (and others soon) in order to route to them
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/EditProfile";
import FindPeople from "./user/FindPeople";
import NewPost from "./post/NewPost";
import EditPost from "./post/EditPost";
import SinglePost from "./post/SinglePost";
import PrivateRoute from './auth/PrivateRoute'; // this component ensures that you are logged in before accessing certain pages
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import Admin from './admin/Admin'

const MainRouter = () => (
  <div>
    <Menu /> {/*this little guy is the menu header on top of every page*/}
    <Switch> {/*special react-router-dom component*/}
      <Route exact path="/" component={Home} /> {/*routing the main page to the Home component, the exact means the url has to be exactly that, otherwise / was overriding /signup*/}
      <PrivateRoute exact path="/admin" component={Admin} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route
        exact
        path="/reset-password/:resetPasswordToken"
        component={ResetPassword}
      />
      <PrivateRoute
        exact
        path="/post/create"
        component={NewPost}
      /> {/*this used to be down lower in the list but was running into issues so we tried moving it higher*/}
      <Route exact path="/post/:postId" component={SinglePost} /> {/*this is the page to show the detail for a single post*/}
      <PrivateRoute
        exact
        path="/post/edit/:postId"
        component={EditPost}
      /> {/*PrivateRoute is a component we use to make sure the user is verified before they can access a certain page*/}
      <Route exact path="/users" component={Users} /> {/*routing the users page to the Users component, the exact means the url has to be exactly that, otherwise / was overriding /signup*/}
      <Route exact path="/signup" component={Signup} /> {/*routing the signup page to the Signup component*/}
      <Route exact path="/signin" component={Signin} /> {/*routing the signin page to the Signin component*/}
      <PrivateRoute
        exact
        path="/user/edit/:userId"
        component={EditProfile}
      /> {/*PrivateRoute is a component we use to make sure the user is verified before they can access a certain page*/}
      <PrivateRoute
        exact
        path="/findpeople"
        component={FindPeople}
      />
      <PrivateRoute
        exact
        path="/user/:userId"
        component={Profile}
      /> {/*PrivateRoute is a component we use to make sure the user is verified before they can access a certain page*/}
    </Switch>
  </div>
);

export default MainRouter;
