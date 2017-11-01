import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

const Footer = ({ history }) => {

  function logout(e) {
    e.preventDefault();

    Auth.logout();
    history.push('/');
  }

  return(
    <footer>
      <Link to="/visited"><img className="footerLogo" src="/assets/favs.png" /></Link>
      <Link to="/landmarks"><img className="footerLogo" src="/assets/flag.png" /></Link>
      <a href="#" onClick={logout}><img className="footerLogo" src="/assets/logout.png" /></a>
    </footer>
  );
};

export default withRouter(Footer);
