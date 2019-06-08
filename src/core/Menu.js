import React from 'react'
import {Link, withRouter} from 'react-router-dom' // withRouter is a higher order componenet which means it takes another component as an argument
import {signout, isAuthenticated} from '../auth'

const isActive = (history, path) => { // this method is for giving color to the active page in the menu bar, works with style in link tag below
  if(history.location.pathname === path) return {color: "#ff9900"}
    else return {color: "#ffffff"}
}

const Menu = ({history}) => ( // don't need class component here because we don't need state, we would be using props.history but we destructured to just {history}
  <div>
    <ul className="nav nav-tabs bg-primary"> {/*bg-primary changes the background color*/}
      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/")}
          to="/"
        >{/*the style part sets the current page's title on the nav bar to yellow, the to= part gives you the link to go to that page*/}
          Home
        </Link> {/*Link is part of react-router-dom that creates a link to a page, use the to method to get directed around the app*/}
      </li>

      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/users")}
          to="/users"
        >
          Users
        </Link> {/*Link is part of react-router-dom that creates a link to a page, use the to method to get directed around the app*/}
      </li>

      <li className="nav-item">
        <Link
          to={`/post/create`}
          style={
            isActive(
              history,
              `/post/create`
            )}
          className="nav-link"
        > {/*Link is part of react-router-dom that creates a link to a page, use the to method to get directed around the app, ALSO Link is also technically an "a" tag and cannot appear inside itself or inside an "a" tag*/}
          Create Post
        </Link>
      </li>

      {!isAuthenticated() && ( // if the user is not authenticated, then it will show signin and signup
        <> {/*div used to be here but it was messing up styling, works without it as a React fragment*/}
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/signin")}
            to="/signin"
          >
            Sign In
          </Link> {/*Link is part of react-router-dom that creates a link to a page, use the to method to get directed around the app*/}
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/signup")}
            to="/signup"
          >
            Sign Up
          </Link> {/*Link is part of react-router-dom that creates a link to a page, use the to method to get directed around the app*/}
        </li>
        </> // div used to be here but it was messing up styling, works without it as a React fragment
      )}

      {isAuthenticated() && (
        <>

        <li className="nav-item">
          <Link
            to={`/findpeople`}
            style={
              isActive(
                history,
                `/findpeople`
              )}
            className="nav-link"
          > {/*Link is part of react-router-dom that creates a link to a page, use the to method to get directed around the app, ALSO Link is also technically an "a" tag and cannot appear inside itself or inside an "a" tag*/}
            Find People
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`/user/${isAuthenticated().user._id}`}
            style={
              isActive(
                history,
                `/user/${isAuthenticated().user._id}`
              )}
            className="nav-link"
          > {/*Link is part of react-router-dom that creates a link to a page, use the to method to get directed around the app, ALSO Link is also technically an "a" tag and cannot appear inside itself or inside an "a" tag*/}
            {`${isAuthenticated().user.name}'s Profile`}
          </Link>
        </li>

        <li className="nav-item">
          <span // we used this instead of "a" tag because "a" tag was giving us a warning
            className="nav-link"
            style={
              (isActive(history, "/signup"),
              {cursor: "pointer", color: "#fff"})
            }
            onClick={() => signout(() => history.push('/'))}
          >
            Sign Out
          </span> {/*using span because "a" tag was giving us errors (also because we don't need "Link" tag to link anywhere)*/}
        </li>

        </>
      )}

      {isAuthenticated() && isAuthenticated().user.role === "admin" && (
    <li className="nav-item">
        <Link
            to={`/admin`}
            style={isActive(history, `/admin`)}
            className="nav-link"
        >
            Admin
        </Link>
    </li>
      )}

      <li className="nav-item">
        <Link
          className="nav-link"
          style={isActive(history, "/test")}
          to="/test"
        >
          Test
        </Link> {/*Link is part of react-router-dom that creates a link to a page, use the to method to get directed around the app*/}
      </li>

    </ul>
  </div>
)

export default withRouter(Menu)
