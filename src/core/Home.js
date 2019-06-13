import React from 'react';
import Posts from "../post/Posts"

const Home = () => (
  <div>

    <div className="jumbotron"> {/*this jumbotron affects the styling thanks to our bootstrap material*/}
      <h2>Home</h2>
      <p className="lead">Welcome to your life!!!</p> {/*not sure why classname is lead, probably for styling*/}
    </div>
    <div className="container">
      <Posts />
    </div>
  </div>
)

export default Home
