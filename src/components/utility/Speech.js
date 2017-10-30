import React from 'react';

class Speech extends  React.Component  {
  state = {
    lang: '',
    extract: ''
  }

  componentDidMount() {
    this.speech = new SpeechSynthesisUtterance();
    this.speech.lang = this.props.lang;
    this.speech.text = this.props.extract;
    this.speech.rate = 0.8;

    this.synth = window.speechSynthesis;
  }

  componentDidUpdate() {
    this.synth.cancel();
    this.speech.lang = this.props.lang;
    this.speech.text = this.props.extract;
    if(this.isSpeaking) this.synth.speak(this.speech);
  }

  speak = () => {
    if(this.synth.speaking) {
      this.isSpeaking = false;
      return this.synth.pause();
    }
    this.isSpeaking = true;
    if(this.synth.paused) return this.synth.resume();
    return this.synth.speak(this.speech);
  };

  speakPause = () => this.synth.pause();

  render() {
    return (
      <div>
        <button className="speechBtn" onClick={this.speak}></button>
      </div>
    );
  }
}

export default Speech;
