import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../Components/Loader';

function NewBlog() {
  const [formData, setFormData] = useState({
    postHeading: '',
    postImage: '',
    postContent: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('token');
    if (!user) {
      toast.error('You are not logged in');
      navigate('/login');
    }
  }, [navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    setIsLoading(true);
    axios
      .post('https://ayurveda-backend.onrender.com/api/v1/addPost', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        toast.success(response.data.message);
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || 'Something went wrong');
      })
      .finally(() => {
        setIsLoading(false); // Stop loader regardless of success or failure
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="w-full max-w-lg bg-green-200 shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">New Blog</h1>
          <form onSubmit={submitHandler} className="space-y-4">
            <label className="block">
              <div className="text-gray-700 font-medium mb-2">Enter the Blog Title</div>
              <input
                type="text"
                name="postHeading"
                placeholder="Blog Title"
                required
                value={formData.postHeading}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            <label className="block">
              <div className="text-gray-700 font-medium mb-2">Blog Image</div>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    postImage: e.target.files[0],
                  }))
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            <label className="block">
              <div className="text-gray-700 font-medium mb-2">Enter the Blog Content</div>
              <textarea
                name="postContent"
                placeholder="Blog Content"
                required
                value={formData.postContent}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 h-32 resize-none"
              ></textarea>
            </label>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default NewBlog;
