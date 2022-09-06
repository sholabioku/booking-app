import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import { AuthContext } from '../../context/AuthContext';
import './login.css';

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('/auth/login', credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
      navigate('/');
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
    }
  };

  return (
    <>
      <Navbar />
      <Header type='list' />
      <div className='login'>
        <div className='lContainer'>
          <h2 className='lTitle'>Login</h2>
          <input
            type='text'
            placeholder='Enter username'
            id='username'
            onChange={handleChange}
            className='lInput'
          />
          <input
            type='password'
            placeholder='Enter password'
            id='password'
            onChange={handleChange}
            className='lInput'
          />
          <button disabled={loading} onClick={handleClick} className='lButton'>
            Login
          </button>
          <span className='lForgotPassword'>Forgot Password</span>
          <div className='lCreateAccount'>
            You don't have account?{' '}
            <Link to='/register' className='lRegister'>
              register
            </Link>{' '}
          </div>
          {error && <span>{error.message}</span>}
        </div>
      </div>
    </>
  );
};

export default Login;
