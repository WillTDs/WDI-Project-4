import React from 'react';
import { Link } from 'react-router-dom';


const Visited = () => {

  return(
    <main>
      <h1>Visited places listed here</h1>
      <button><Link to="/landmarks">Landmarks</Link></button>
    </main>
  );
};

export default Visited;
