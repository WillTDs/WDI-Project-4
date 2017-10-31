import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import Footer from '../utility/Footer';

class Visited extends React.Component {
  state = {
    user: {}
  }

  componentWillMount() {
    Axios
      .get('/api/visited', {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.setState({ user: res.data }, () => console.log(this.state.user)))
      .catch(err => console.log(err));
  }

  deletePlace = () => {
    const placeId = this.state.user.places.id;
    console.log(placeId);
    Axios
      .delete(`/api/visited/${placeId}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => console.log('deleted'))
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
        <div className="showContainer">
          <h1>Visited</h1>
          <div>
            {this.state.user.places && this.state.user.places.map(place => (
              <div className="showCard" key={place.id}>
                <h4 className="showTitle">{place.title}</h4>
                <p className="showText">{place.shortExtract}</p>
                {Auth.isAuthenticated() &&
                  <button
                    className="showDelBtn"
                    onClick={this.deletePlace}>X
                  </button>}
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Visited;
