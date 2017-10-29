import React from 'react';
import Axios from 'axios';

import ImageUpload from '../utility/ImageUpload';
import countries from '../../lib/countries';
import LanguageSelect from './LanguageSelect';

class Index extends React.Component {
  state = {
    base64: '',
    lang: '',
    result: ''
  };

  handleImage = () => {
    Axios
      .post('/api/vision', this.state)
      .then(res => this.setState({ imageResults: res.data }, () => console.log(this.state)))
      .catch(err => console.log(err));
  }

  selectResult = (result) => {
    this.setState({ result: result.description }, this.handleWiki);
  }

  handleWiki = () => {

    Axios
      .get('/api/wiki', {
        params: { title: this.state.result, lang: this.state.lang }
      })
      .then(res => this.setState({ wikiResult: res.data }, () => console.log(this.state)))
      // get the stuff rdy for wiki {this.state[0]} e.target.innerhtml
      .catch(err => console.log(err));
  }

  handleChange = base64 => {
    this.setState({ base64 });
  }

  langChange = (e) => {
    const lang = e.target.value;
    this.setState({ lang }, this.handleWiki);
  }

  render() {
    return (
      <div className="container">
        <div className="row landmarkHeader">
          <h1 className="landmarkTitle">LANDMARKER</h1>
          <div className="flags">
            {
              countries.map(country => (
                <LanguageSelect key={country.code} handleClick={this.langChange} {...country} />
              ))
            }
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <ImageUpload
              handleChange={this.handleChange}
              base64={this.state.base64}
              handleClick={this.handleImage}
            />

            {
              this.state.imageResults && this.state.imageResults.map(result =>
                <button className="resultsButton" key={result.entityId} onClick={() => this.selectResult(result)}>
                  {result.description}
                </button>
              )
            }
          </div>
          <div className="col-md-8">
            {
              this.state.wikiResult &&
              <div>
                <h1 className="wikiTitle">{this.state.wikiResult.title}</h1>
                <p className="wikiExtract">{this.state.wikiResult.extract}</p>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
