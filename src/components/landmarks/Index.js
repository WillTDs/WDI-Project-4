import React from 'react';
import Axios from 'axios';

import ImageUpload from '../utility/ImageUpload';

class Index extends React.Component {
  state = {
    base64: ''
  };

  submitBase64 = () => {

    const pageid = Object.keys(query.pages)[0];
    const page = query.pages[pageid];

    Axios
      .post('/api/vision', this.state)
      .then(res => this.setState({ results: res.data.responses[0].webDetection.webEntities }))
      .post('api/wiki', this.state[0])
      .then(res => this.setState({ wikiResults: res.data.page }))
      .catch(err => console.log(err));
  }
//get the stuff rdy for wiki {this.state[0]} e.target.innerhtml
  handleChange = base64 => {
    this.setState({ base64 });
  }

  render() {
    console.log('STATE', this.state);
    return (
      <div>
        <h1>LANDMARKS</h1>
        <ImageUpload
          handleChange={this.handleChange}
          base64={this.state.base64}
          handleClick={this.submitBase64}
        />
        {this.state.results && this.state.results.map(result => <p key={result.entityId}>{result.description}</p>)}
      </div>
    );
  }
}

export default Index;
