import React from 'react';
import Axios from 'axios';

import ImageUpload from '../utility/ImageUpload';

class Index extends React.Component {
  state = {
    base64: ''
  };

  handleImage = () => {
    Axios
      .post('/api/vision', this.state)
      .then(res => this.setState({ imageResults: res.data }, () => console.log(this.state)))
      .catch(err => console.log(err));
  }

  handleWiki = (result) => {
    Axios
      .get('/api/wiki', {
        params: { title: result.description }
      })
      .then(res => this.setState({ wikiResult: res.data }, () => console.log(this.state)))
      // get the stuff rdy for wiki {this.state[0]} e.target.innerhtml
      .catch(err => console.log(err));
  }

  handleChange = base64 => {
    this.setState({ base64 });
  }

  render() {
    return (
      <div>
        <h1>LANDMARKS</h1>
        <ImageUpload
          handleChange={this.handleChange}
          base64={this.state.base64}
          handleClick={this.handleImage}
        />
        {this.state.imageResults && this.state.imageResults.map(result => <button key={result.entityId} onClick={() => this.handleWiki(result)}>{result.description}</button>)}
        {this.state.wikiResult && <div>
          <h1>{this.state.wikiResult.title}</h1>
          <p>{this.state.wikiResult.extract}</p>
        </div>}
      </div>
    );
  }
}

export default Index;
