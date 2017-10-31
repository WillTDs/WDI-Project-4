import React from 'react';

class TestSpeech extends  React.Component  {
  state = {
    lang: 'en',
    extract: 'Mr. and Mrs. Dursley, of number four, Privet Drive, were proud to say that they were perfectly normal, thank you very much. They were the last people you\'d expect to be involved in anything strange or mysterious, because they just didn\'t hold with such nonsense.'
  }

  componentDidMount() {
    this.synth = window.speechSynthesis;
    this.sentenceMaker();
    // console.log('this.speech', this.speech);
    // this.speech.lang = this.props.lang;
    // this.speech.text = this.props.extract;
    // this.speech.rate = 0.8;
  }

  componentDidUpdate() {
    this.synth.cancel();

    this.sentenceMaker(); // recalculate the sentence and start the speech in that lang

    // if(this.isSpeaking) this.synth.speak(this.speech);
  }

  speak = () => {
    this.playToggle();

    if(this.synth.paused) {
      console.log('RESUMING');
      this.isSpeaking = true;
      return this.synth.resume();
    } else {
      console.log('PAUSING');
      this.isSpeaking = false;
      return this.synth.pause();
    }

    // return this.synth.speak(this.speech);
  };

  speakPause = () => this.synth.pause();

  playToggle = () => {
    this.button.classList.toggle('pauseClass');
  }

  sentenceMaker = () => {
    const sentences = this.state.extract.split('.');
    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i];

      if (sentence.length > 0) {
        if(sentence.length < 5) {
          sentences[i + 1] = `${sentence}${sentences[i + 1]}`;
        } else {
          const audio = new SpeechSynthesisUtterance();
          audio.text = sentence;
          audio.lang = this.state.lang;
          audio.rate = 0.8;
          this.synth.speak(audio);
        }
      }
    }
  }

  render() {
    return (
      <div className="speechWrap">
        <button className="speechBtn" onClick={this.speak} ref={element => this.button = element}></button>
      </div>
    );
  }
}

export default TestSpeech;
