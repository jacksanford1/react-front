import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';

class Photo extends Component {
  onTakePhoto (dataUri) {
    // Do stuff with the dataUri photo...
    console.log('takePhoto');
  }

  render () {
    return (
      <div className="Photo">
        <Camera
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
        />
      </div>
    );
  }
}

export default Photo;
