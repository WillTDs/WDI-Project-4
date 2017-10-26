import React from 'react';
import Axios from 'axios';

import ImageUpload from '../utility/ImageUpload';

class Index extends React.Component {
  state = {
    base64: ''
  };

  submitBase64 = () => {
    Axios
      .post('/api/vision', this.state)
      .then(res => this.setState({ results: res.data.responses[0].webDetection.webEntities }, () => console.log(this.state)))
      .catch(err => console.log(err));
  }

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
