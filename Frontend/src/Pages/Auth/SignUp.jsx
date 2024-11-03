import React, { useState } from 'react';
import image from "../../Assects/Chiapas_Rainforest_crop.jpg"

function SignUp() {
  const [selectAdmin, setSelectAdmin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false,
    accessCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    const isAdmin = e.target.value === 'Admin';
    setSelectAdmin(isAdmin);
    setFormData((prevData) => ({
      ...prevData,
      isAdmin,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>

      <div>Sign UP</div>
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-1/2 flex justify-center p-5'>
          <div className='w-full max-w-sm bg-green-500 p-5 rounded-md shadow-lg'>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-5'>
              <label className='flex flex-col'>
                <span>Name</span>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='border-2 border-black rounded-md p-2'
                />
              </label>

              <label className='flex flex-col'>
                <span>Email</span>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='border-2 border-black rounded-md p-2'
                />
              </label>

              <label className='flex flex-col'>
                <span>Password</span>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='border-2 border-black rounded-md p-2'
                />
              </label>

              <label className='flex flex-col'>
                <span>Confirm Password</span>
                <input
                  type='password'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className='border-2 border-black rounded-md p-2'
                />
              </label>

              <div className='flex flex-col'>
                <span>Role</span>
                <div className='flex space-x-3'>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="User"
                      required
                      onChange={handleRoleChange}
                    />
                    User
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="Admin"
                      required
                      onChange={handleRoleChange}
                    />
                    Admin
                  </label>
                </div>
              </div>

              {selectAdmin && (
                <label className='flex flex-col'>
                  <span>Enter the access code:</span>
                  <input
                    type="text"
                    name="accessCode"
                    value={formData.accessCode}
                    onChange={handleChange}
                    className='border-2 border-black rounded-md p-2'
                    required
                  />
                </label>
              )}

              <button type="submit" className='border-2 border-black rounded-md p-2 bg-blue-300 hover:scale-105'>
                Sign Up
              </button>
            </form>
          </div>
        </div>

        <div className='hidden md:block md:w-1/2'>
          <img src={image} className='h-[80vh] w-full object-cover' alt="Chiapas Rainforest" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
