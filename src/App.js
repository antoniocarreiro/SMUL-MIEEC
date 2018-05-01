import React, { Component } from 'react';
import './App.css';
import Slider from './Slider';
import {Howl} from 'howler';

class App extends Component {
  constructor() {
    super();
    this.state = {
      sliders: [
        {
          title: "Drums", volume: Math.random()
        },

        {
          title: "Vocals", volume: Math.random()
        },

        {
          title: "Lead", volume: Math.random()
        },

        {
          title: "Bass", volume: Math.random()
        }
      ],

      toggle: true
    }

    this.userSounds = [
      {
        sound: new Howl({ src: ['atw.mp3']}),
      },

      {
        sound: new Howl({ src: ['dafunk.mp3']}),

      },

      {
        sound: new Howl({ src: ['encore.mp3']}),

      },

      {
        sound: new Howl({ src: ['lucifer.mp3']}),
      },
    ];

    this.originalSounds = [
      {
        sound: new Howl({ src: ['nfw.mp3']}),
        volume: 0.7
      },

      {
        sound: new Howl({ src: ['atm.mp3']}),
        volume: 0.45
      },

      {
        sound: new Howl({ src: ['sigo.mp3']}),
        volume: 0.8
      },

      {
        sound: new Howl({ src: ['anthem.mp3']}),
        volume: 0.9
      },
    ];
  }

  handleVolumeChange(title, value)
  {
      let state = this.state;
      let index = state.sliders.findIndex((slider) => slider.title === title);
      state.sliders[index].volume = value;

      if(this.state.toggle)
        this.userSounds[index].sound.volume(value);
      
      this.setState(state);
  }

  handleToggle(event)
  {
    this.setState({toggle: event.target.checked});

    if(!event.target.checked){

      this.userSounds.forEach((track, index) => {
        track.sound.volume(0);
      })

      this.originalSounds.forEach((track, index) => {
        track.sound.volume(track.volume);
      })
    }

    else {
      this.userSounds.forEach((track, index) => {
        console.log(this.state.sliders[index].volume)
        track.sound.volume(this.state.sliders[index].volume);
      })

      this.originalSounds.forEach((track, index) => {
        track.sound.volume(0);
      })   
    }

  }

  render() {
    let sliders = this.state.sliders.map((slider, index) => {
      return (
        <Slider data={slider} onVolumeChange={this.handleVolumeChange.bind(this)} key={index} />
      )
    });
    return (
      <div className="MixingDesk">
        {sliders}
        <label className="switch">
          <input type="checkbox" defaultChecked={this.state.toggle} onChange={this.handleToggle.bind(this)}></input>
          <span className="slider"></span>
        </label>
      </div>
    );
  }

  componentDidMount() {

    this.userSounds.forEach((track, index) => {
      track.sound.volume(this.state.sliders[index].volume);
      track.sound.play();
      console.log(track)
    })

    this.originalSounds.forEach(track => {
      track.sound.volume(0);
      track.sound.play();
    })
  }
}

export default App;
