import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => (
  <div className="landingImage">
    <div className="landingBlock">
      <div>
        <span className="border">
          sit-n-paws
        </span>
      </div>
      <div>
          <Link to='/login'><span className="landingLoginLink">Login / Register</span></Link>
      </div>
    </div>
  </div>
)

export default Home;
