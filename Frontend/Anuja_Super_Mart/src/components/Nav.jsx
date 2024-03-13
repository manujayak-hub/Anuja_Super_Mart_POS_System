import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/Login">Log In</Link></li>
          <li><Link to="/signup">Sign up</Link></li>

        </ul>
      </nav>

      {/* import { useStore } from './store';

const SomeComponent = () => {
  const user = useStore(state => state.user);

  return (
    <div>
      {user ? (
        <p>Welcome, {user.username}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
};
 */}
 
    </header>
  );
}

export default Header;
