import React, { Component } from 'react';

class Modal extends Component {
  render() {
    if (this.props.score >= 0.9) {
      return (
        <div className="scoreModal">
            <h2>Score: {this.props.score.toFixed(2)}</h2>
            <img className="scoreIcon" src="/star.svg" alt="Grammy Statuette"/>
            <h5>Congratulations, see you at the Grammys!</h5>
        </div>
      );
    }

    if (this.props.score >= 0.8 && this.props.score < 0.9) {
      return (
          <div className="scoreModal">
                <h2>Score: {this.props.score.toFixed(2)}</h2>
                <img className="scoreIcon" src="/thumbsup.svg" alt="Thumbs up"/>
                <h5>Good job, but keep practicing!</h5>
          </div>
      );
    }

    if (this.props.score < 0.8) {
      return (
            <div className="scoreModal">
                <h2>Score: {this.props.score.toFixed(2)}</h2>
                <img className="scoreIcon" src="/stop.svg" alt="Stop"/>
                <h5>I'm calling an Audiologist!</h5>
            </div>
      );
    }

    return (
        <div className="scoreModal">
            <h2>Score: {this.props.score.toFixed(2)}</h2>
            <img className="scoreIcon" src="/star.svg" alt="Grammy Statuette"/>
            <h5>Congratulations, see you at the Grammys!</h5>
        </div>
    );
  }
}

export default Modal;
