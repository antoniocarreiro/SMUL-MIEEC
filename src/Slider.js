import React, { Component } from 'react';

class Slider extends Component {
  handleChange(event) {
    this.props.onVolumeChange(this.props.data.title, event.target.value);
  }

  render() {
    return (
      <div className="volbox" key={this.props.data.title}>
        <input
          id="volume"
          type="range"
          min="0"
          max="1"
          value={this.props.data.volume}
          step="0.01"
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}

export default Slider;
