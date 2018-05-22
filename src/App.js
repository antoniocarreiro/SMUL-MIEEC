import { Howl } from 'howler';
import React, { Component } from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import * as ScrollMagic from 'scrollmagic';
import Slider from './Slider';
import Modal from './Modal';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      sliders: [
        {
          title: 'Drums',
          volume: Math.random(),
        },

        {
          title: 'Vocals',
          volume: Math.random(),
        },

        {
          title: 'Lead',
          volume: Math.random(),
        },

        {
          title: 'Bass',
          volume: Math.random(),
        },
      ],

      toggle: true,
      submitWindow: false,
      score: 0,
    };

    this.userSounds = [
      {
        sound: new Howl({ src: ['atw.mp3'] }),
      },

      {
        sound: new Howl({ src: ['dafunk.mp3'] }),
      },

      {
        sound: new Howl({ src: ['encore.mp3'] }),
      },

      {
        sound: new Howl({ src: ['lucifer.mp3'] }),
      },
    ];

    this.originalSounds = [
      {
        sound: new Howl({ src: ['nfw.mp3'] }),
        volume: 0.7,
      },

      {
        sound: new Howl({ src: ['atm.mp3'] }),
        volume: 0.45,
      },

      {
        sound: new Howl({ src: ['sigo.mp3'] }),
        volume: 0.8,
      },

      {
        sound: new Howl({ src: ['anthem.mp3'] }),
        volume: 0.9,
      },
    ];

    this.controller = new ScrollMagic.Controller();
  }

  handleVolumeChange(title, value) {
    const state = this.state;
    const index = state.sliders.findIndex(slider => slider.title === title);
    state.sliders[index].volume = value;

    if (this.state.toggle) this.userSounds[index].sound.volume(value);

    this.setState(state);
  }

  hide() {
    this.setState({ submitWindow: false });
  }

  handleSubmit() {
    let score = 0;

    this.userSounds.forEach((track, index) => {
      track.sound.stop();
      score += Math.abs(track.sound._volume - this.originalSounds[index].volume);
    });

    this.originalSounds.forEach((track) => {
      track.sound.stop();
    });

    this.setState({ submitWindow: true, score: (2.95 - score) / 2.95 });
  }

  handleRestart() {
    this.setState(prevState => ({
      sliders: prevState.sliders.map(slider => ({
        title: slider.title,
        volume: Math.random(),
      })),
      toggle: true,
    }));

    this.userSounds.forEach((track, index) => {
      track.sound.seek(0);
      track.sound.volume(this.state.sliders[index].volume);
      track.sound.play();
    });

    this.originalSounds.forEach((track) => {
      track.sound.seek(0);
      track.sound.volume(0);
      track.sound.play();
    });
  }

  handleToggle(event) {
    this.setState({ toggle: event.target.checked });

    if (!event.target.checked) {
      this.userSounds.forEach((track) => {
        track.sound.volume(0);
      });

      this.originalSounds.forEach((track) => {
        track.sound.volume(track.volume);
      });
    } else {
      this.userSounds.forEach((track, index) => {
        track.sound.volume(this.state.sliders[index].volume);
      });

      this.originalSounds.forEach((track) => {
        track.sound.volume(0);
      });
    }
  }

  render() {
    const sliders = this.state.sliders.map((slider, index) => (
        <Slider
          data={slider}
          onVolumeChange={this.handleVolumeChange.bind(this)}
          key={index}
        />
    ));
    return (
      <div className="MixingDesk">
        <div className="sliderContainer">
          {sliders}
        </div>

        <div className="controllsContainer">
          <button type="button" className="primary-btn hover d-inline-flex align-items-center" onClick={this.handleSubmit.bind(this)}>
            <span>Submit</span>
          </button>

          <input id="cb3" className="tgl tgl-skewed" type="checkbox"
            checked={this.state.toggle}
            onChange={this.handleToggle.bind(this)}/>
          <label className="tgl-btn" data-tg-off="OFF" data-tg-on="ON" for="cb3"/>

          <button type="button" className="primary-btn hover d-inline-flex align-items-center" onClick={this.handleRestart.bind(this)}>
            <span>Restart</span>
          </button>
        </div>

        <Rodal visible={this.state.submitWindow} onClose={this.hide.bind(this)}>
          <Modal score={this.state.score}/>
        </Rodal>
      </div>
    );
  }

  playSounds() {
    this.userSounds.forEach((track) => {
      if (!track.sound.playing()) { track.sound.play(); }
    });

    this.originalSounds.forEach((track) => {
      if (!track.sound.playing()) { track.sound.play(); }
    });
  }

  componentDidMount() {
    this.userSounds.forEach((track, index) => {
      track.sound.volume(this.state.sliders[index].volume);
    });

    this.originalSounds.forEach((track) => {
      track.sound.volume(0);
    });

    new ScrollMagic.Scene({ triggerElement: '#root' })
      .on('start', this.playSounds.bind(this))
      .addTo(this.controller);
  }
}

export default App;
