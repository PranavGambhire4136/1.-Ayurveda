import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../../Components/Loader';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoding, setIsLoding] = useState(false);

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
    setIsLoding(true);

    const setToken = (key, token, expiryTimeInSeconds) => {
      const expiryTime = Date.now() + expiryTimeInSeconds * 1000;
      const tokenData = { token, expiry: expiryTime };
      localStorage.setItem(key, JSON.stringify(tokenData));
      console.log("The token will expire in time", new Date(expiryTime));
    };

    e.preventDefault();
    axios
      .get('api/login', {
        params: { email: formData.email, password: formData.password },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        console.log('Login successful');
        console.log(response.data.token);
        setToken('token', response.data.token, 60 * 60 * 24 - 1.5 * 60);

        toast.success('Login successful');
        console.log(localStorage);
        navigate('/');
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(error.response.data.message);
        console.log('Login failed');
      });

    setIsLoding(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-100 to-green-200">
      {isLoding && <Loader />}

      {!isLoding && (
        <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-5 transition-transform transform hover:scale-105">
          <h2 className="text-3xl font-extrabold text-center text-green-600 mb-5">
            Welcome Back!
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <label className="flex flex-col">
              <span className="text-green-800">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border-2 border-green-300 rounded-md p-2 focus:outline-none focus:border-green-500"
                required
              />
            </label>

            <label className="flex flex-col">
              <span className="text-green-800">Password</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border-2 border-green-300 rounded-md p-2 focus:outline-none focus:border-green-500"
                required
              />
            </label>

            <button
              type="submit"
              className="bg-green-600 text-white rounded-md p-2 hover:bg-green-700 hover:shadow-lg transition"
            >
              Login
            </button>
          </form>
          <button
            className="bg-green-600 w-full text-white rounded-md p-2 hover:bg-green-700 hover:shadow-lg mt-3 transition"
            onClick={() => navigate('/signUp')}
          >
            Register User
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;
