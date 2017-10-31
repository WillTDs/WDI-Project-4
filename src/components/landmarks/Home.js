import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';
// import TestSpeech from '../utility/TestSpeech';

const Home = ({ history }) => {

  function logout(e) {
    e.preventDefault();

    Auth.logout();
    history.push('/');
  }

  return(
    <div className="homePage">
      <div className="homeCol">
        <h1 className="homeTitle">LANDMARKER</h1>
        <div className="homeBtnWrap">
          {Auth.isAuthenticated() && <Link to="/landmarks" className="homeBtn">Go</Link>}
          {Auth.isAuthenticated() && <Link to="/visited" className="homeBtn">Visited</Link>}
          {!Auth.isAuthenticated() && <Link to="/login" className="homeBtn">Login</Link>}
          {!Auth.isAuthenticated() && <Link to="/register" className="homeBtn">Register</Link>}
          {Auth.isAuthenticated() && <button className="homeBtn" href="#" onClick={logout}>Logout</button>}
          {/* <TestSpeech /> */}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Home);
