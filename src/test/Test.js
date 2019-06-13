import React, { Component } from "react";
import PhotoCapture from './PhotoCapture';

class Test extends Component {

  constructor(props){
    super(props);
    this.state = {monkeys: 0}
    this.increment = this.increment.bind(this);
  }
  increment



  render() {

      return (
          <div>
              <PhotoCapture title="HELLO" body="This is really saying something"/>
              <p>{this.state.monkeys}</p>
          </div>
      );
  }
}

export default Test;
