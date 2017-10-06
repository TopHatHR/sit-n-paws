import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => (
  <div className="landingImage">
    <div className="landingBlock">
      <span className="border">
        sit-n-paws
      <Link to='/login'>Login / Register</Link>
      </span>
    </div>
  </div>
)

export default Home;