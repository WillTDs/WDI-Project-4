import React from 'react';
import Axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

import ImageUpload from '../utility/ImageUpload';
import countries from '../../lib/countries';
import LanguageSelect from '../utility/LanguageSelect';
import Speech from '../utility/Speech';

class Index extends React.Component {
  state = {
    base64: '',
    lang: '',
    result: '',
    imageResults: [],
    wikiResult: {}
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
      .catch(err => console.log(err));
  }

  handleChange = base64 => {
    this.setState({ base64 });
  }

  langChange = (e) => {
    const lang = e.target.value;
    const result = this.state.wikiResult.langlinks.find(langlink => langlink.lang === lang)['*'];
    this.setState({ lang, result }, this.handleWiki);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-5 indexImage">
            <Link className="landmarkTitleLink" to="/"><h1 className="landmarkTitle">LANDMARKER</h1></Link>
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
          <div className="col-md-7">
            {
              this.state.wikiResult &&
              <div>
                <div className="flags">
                  {
                    this.state.wikiResult.extract &&
                    <Speech extract={this.state.wikiResult.extract} lang={this.state.lang} />
                  }
                  {
                    countries.map(country => (
                      <LanguageSelect key={country.code} handleClick={this.langChange} {...country} />
                    ))
                  }
                </div>
                <div>
                  <h1 className="wikiTitle">{this.state.wikiResult.title}</h1>
                  <p className="wikiExtract">{this.state.wikiResult.extract}</p>
                  <button className="wikiSaveBtn">Save</button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Index);
