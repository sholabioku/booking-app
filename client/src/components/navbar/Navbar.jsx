import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './navbar.css';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className='navConatiner'>
        <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
          <span className='logo'>bilushbooking</span>
        </Link>
        {user ? (
          <div className='navItems'>
            {user.username}
            <button className='navButton'>Logout</button>
          </div>
        ) : (
          <div className='navItems'>
            <button className='navButton'>Register</button>
            <button className='navButton'>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
