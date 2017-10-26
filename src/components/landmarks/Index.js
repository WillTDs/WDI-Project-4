import React from 'react';
import Axios from 'axios';

import ImageUpload from '../utility/ImageUpload';

class Index extends React.Component {
  state = {
    base64: ''
  };

  submitBase64 = () => {
    Axios
      .post(`/api/landmarks/${this.props.match.params.id}`)
      .then(res => this.setState({ landmark: res.data }, () => console.log(this.state)))
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
      </div>
    );
  }
}

export default Index;
