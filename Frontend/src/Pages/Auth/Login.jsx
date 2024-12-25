import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';


function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      toast.error('You are already logged in');
      navigate('/');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {

    const setToken = (key, token, expiryTimeInSeconds) => {
      const expiryTime = Date.now() + expiryTimeInSeconds * 1000;
      const tokenData = { token, expiry: expiryTime };
      localStorage.setItem(key, JSON.stringify(tokenData));
      console.log("The token will expire in time", new Date(expiryTime));
    };

    e.preventDefault();
    axios.get('http://localhost:4000/api/v1/login', { params: { email: formData.email, password: formData.password }, withCredentials: true  })
      .then((response) => {
        console.log(response.data);
        console.log('Login successful');
        console.log(response.data.token);
        setToken('token', response.data.token, ((60 * 60 * 24) - (1.5 * 60)) );

        toast.success('Login successful');
        console.log(localStorage);
        navigate('/');
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(error.response.data.message);
        console.log('Login failed');
      })
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm bg-white shadow-lg rounded-md p-5'>
        <h2 className='text-2xl font-bold mb-5 text-center'>Login</h2>
        <form onSubmit={handleSubmit} className='flex flex-col space-y-5'>
          <label className='flex flex-col'>
            <span>Email</span>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='border-2 border-gray-300 rounded-md p-2'
              required
            />
          </label>

          <label className='flex flex-col'>
            <span>Password</span>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='border-2 border-gray-300 rounded-md p-2'
              required
            />
          </label>

          <button type="submit" className='bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 transition'>
            Login
          </button>
        </form>
        <button className='bg-blue-600 w-full text-white rounded-md p-2 hover:bg-blue-700 mt-3' onClick={() => navigate('/signUp')}>Register User</button>
      </div>
    </div>
  );
}
export default Login;