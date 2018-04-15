import React, { Component } from 'react';

class Slider extends Component {
  
  handleChange(event) {
    this.props.onVolumeChange(this.props.data.title, event.target.value);
  }

  render() {
    return (
    <div className="volbox" key={this.props.data.title}>
    {this.props.data.title}<br/>
    <input id="volume" type="range" orient="vertical" min="0" max="1" value={this.props.data.volume} step="0.01" onChange={this.handleChange.bind(this)}/>
    </div>  
    );
  }
}

export default Slider;
