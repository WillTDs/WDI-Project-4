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
    <main>
      {Auth.isAuthenticated() && <button><Link to="/landmarks">Landmarks</Link></button>}
      {!Auth.isAuthenticated() && <button><Link to="/login">Login</Link></button>}
      {!Auth.isAuthenticated() && <button><Link to="/register">Register</Link></button>}
      {Auth.isAuthenticated() && <a href="#" onClick={logout}>Logout</a>}
    </main>
  );
};

export default withRouter(Home);
