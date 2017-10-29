import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

const Home = ({ history }) => {

  function logout(e) {
    e.preventDefault();

    Auth.logout();
    history.push('/');
  }

  return(
    <main className="homePage">
      <img className="homeBackground" src="assets/london.png" />
      <div className="row">
        <div className="col-md-8 offset-md-2 homeCol">
          <h1 className="homeTitle">LANDMARKER</h1>
          <div className="homeBtnWrap">
            {Auth.isAuthenticated() && <button className="homeBtn"><Link to="/landmarks">Go</Link></button>}
            {Auth.isAuthenticated() && <button className="homeBtn"><Link to="/visited">Favs</Link></button>}
            {!Auth.isAuthenticated() && <button className="homeBtn"><Link to="/login">Login</Link></button>}
            {!Auth.isAuthenticated() && <button className="homeBtn"><Link to="/register">Register</Link></button>}
            {Auth.isAuthenticated() && <button className="homeBtn" href="#" onClick={logout}>Logout</button>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default withRouter(Home);
