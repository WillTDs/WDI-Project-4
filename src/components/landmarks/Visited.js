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

  deletePlace = (place) => {
    console.log('placeId: ', place.id);
    Axios
      .delete(`/api/visited/${place.id}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then((res) => this.setState({ user: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return(
      <div>
        <div className="showContainer">
          <h1 className="showTitle">Visited</h1>
          <div>
            {this.state.user.places && this.state.user.places.map(place => (
              <div className="showCard" key={place.id}>
                <div>
                  <img src="./assets/blackFlag2.png" className="showCardIcon" />
                  {Auth.isAuthenticated() &&
                  <h4
                    className="showDelBtn"
                    onClick={() => this.deletePlace(place)}>X
                  </h4>}
                  <h4 className="showCardTitle">{place.title}</h4>
                </div>
                <p className="showText">{place.shortExtract}</p>
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
