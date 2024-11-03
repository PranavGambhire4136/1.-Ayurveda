import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add your login logic here
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
      </div>
    </div>
  );
}
export default Login;