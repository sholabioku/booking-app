import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navConatiner'>
        <Link to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
          <span className='logo'>bilushbooking</span>
        </Link>
        <div className='navItems'>
          <button className='navButton'>Register</button>
          <button className='navButton'>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
