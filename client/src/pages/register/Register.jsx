import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './register.css';

const Register = () => {
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
      const res = await axios.post('/auth/register', credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
      navigate('/');
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
    }
  };

  return (
    <div className='register'>
      <div className='rContainer'>
        <input
          type='text'
          placeholder='username'
          id='username'
          onChange={handleChange}
          className='rInput'
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          onChange={handleChange}
          className='rInput'
        />
        <input
          type='password'
          placeholder='password'
          id='password'
          onChange={handleChange}
          className='rInput'
        />
        <input
          type='text'
          placeholder='phone'
          id='phone'
          onChange={handleChange}
          className='rInput'
        />
        <input
          type='text'
          placeholder='city'
          id='city'
          onChange={handleChange}
          className='rInput'
        />
        <input
          type='text'
          placeholder='counrty'
          id='counrty'
          onChange={handleChange}
          className='rInput'
        />
        <button disabled={loading} onClick={handleClick} className='rButton'>
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
