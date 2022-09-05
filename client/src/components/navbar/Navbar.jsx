import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <div className='navbar'>
      <div className='navConatiner'>
        <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
          <span className='logo'>bilushbooking</span>
        </Link>
        {user ? (
          <div className='navItems'>
            {user.username}
            <button className='navButton' onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className='navItems'>
            <button className='navButton' onClick={() => navigate('/register')}>
              Register
            </button>
            <button className='navButton' onClick={() => navigate('/login')}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
