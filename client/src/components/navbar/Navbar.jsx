import './navbar.css';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navConatiner'>
        <span className='logo'>bilushbooking</span>
        <div className='navItems'>
          <button className='navButton'>Register</button>
          <button className='navButton'>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
