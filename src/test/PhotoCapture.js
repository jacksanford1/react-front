import React, { Component } from "react";


class PhotoCapture extends Component {

  render() {

      return (
          <div>
              <h1>{this.props.title}</h1>
              <h2>{this.props.body}</h2>
          </div>
      );
  }
  }

export default PhotoCapture;
