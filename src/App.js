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
      ]
    }

    this.sounds = [
      new Howl({
        src: ['nfw.mp3']
      }),
      new Howl({
        src: ['atm.mp3']
      }),
      new Howl({
        src: ['anthem.mp3']
      }),
      new Howl({
        src: ['sigo.mp3']
      })
    ];
  }

  handleVolumeChange(title, value)
  {
    let state = this.state;
    let index = state.sliders.findIndex((slider) => slider.title === title);
    state.sliders[index].volume = value;

    this.sounds[index].volume(value);
    
    this.setState(state);
  }

  render() {
    let sliders = this.state.sliders.map((slider) => {
      return (
        <Slider data={slider} onVolumeChange={this.handleVolumeChange.bind(this)} />
      )
    });
    return (
      <div className="MixingDesk">
        {sliders}
      </div>
    );
  }

  componentDidMount() {
    this.sounds.forEach((sound, index) => {
      sound.volume(this.state.sliders[index].volume);
      sound.play();
    })
  }
}

export default App;
