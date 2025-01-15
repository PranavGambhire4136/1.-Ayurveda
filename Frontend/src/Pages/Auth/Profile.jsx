import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import Loader from "../../Components/Loader";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import BlogList from '../../Assects/BlogList';
import { IoMdAddCircle } from "react-icons/io";
import taost from 'react-hot-toast';

function Profile() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    userName: "",
    type: "",
    post: [],
    profile: "",
  });
  const [post, setPost] = useState([]);
  const [isLoding, setIsLoding] = useState(false);


  const getData = () => {
    setIsLoding(true); // Show the loader
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const email = decodedToken.email;

      axios
        .get(`http://localhost:5000/api/v1/getUser`, {
          params: { email: email.toString() },
          withCredentials: true,
        })
        .then((response) => {
          // //consolelog(response.data);
          setData(response.data.data);
        })
        .catch((error) => {
          //consoleerror(error);
        });

      axios
        .get(`http://localhost:5000/api/v1/getUserPost`, { withCredentials: true })
        .then((response) => {
          // //consolelog("Posts", response.data.data);
          setPost(response.data.data);
        })
        .catch((error) => {
          //consoleerror(error);
        })
        .finally(() => {
          // Hide the loader after all API calls are complete
          setIsLoding(false);
        });
    } else {
      toast.error('User is not logged in');
      navigate('/');
      setIsLoding(false); // Ensure the loader is hidden even if the user is not logged in
    }
  };

  const addProfile = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.click();

    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      setIsLoding(true);
      toast('updating profile please wait');
      axios
        .post('http://localhost:5000/api/v1/addProfile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        })
        .then((response) => {
          // //consolelog(response.data);
          toast.success(response.data.message);
          getData();
        })
        .catch((error) => {
          // //consoleerror(error);
          toast.error(error.response.data.message);
        })
        .finally(() => {
          setIsLoding(false);
        })
        ;
    });
  }


  useEffect(getData, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {isLoding && (
        <div className="flex justify-center items-center min-h-screen">
          <Loader />
        </div>
      )}

      {!isLoding && (
        <div className="max-w-7xl mx-auto space-y-8">
          {/* User Info Section */}
          <div className="flex items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative">

              {data.profile ? (
                <img
                  src={data.profile}
                  alt="user"
                  className="rounded-full w-12 h-12 border-2 border-gray-300"
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="user"
                  className="rounded-full w-12 h-12 border-2 border-gray-300"
                />
              )}
              {/* <img
                src={data.profile}
                alt="user"
                className="rounded-full w-12 h-12 border-2 border-gray-300"
              /> */}
              <IoMdAddCircle className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 text-gray-500 text-lg cursor-pointer hover:text-gray-800 transition-colors duration-200 scale-150" onClick={() => {
                addProfile();
              }}/>
            </div>
            <span className="ml-4 text-gray-800 text-sm font-medium">{data.name}</span>
          </div>



          <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-800">User Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-gray-700">
                <span className="font-semibold">Name:</span> {data.name}
              </div>
              <div className="text-gray-700">
                <span className="font-semibold">Email:</span> {data.email}
              </div>
              <div className="text-gray-700">
                <span className="font-semibold">Username:</span> {data.userName}
              </div>
              <div className="text-gray-700">
                <span className="font-semibold">Role:</span> {data.type}
              </div>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Blogs</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {post.map((item, index) => (
                <div
                  key={item._id}
                  className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <BlogList blog={item} />
                </div>
              ))}
            </div>
          </div>

          <div className='flex justify-center'>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
              onClick={() => navigate('/additionalInformation')}
            >
              Aditional Information
            </button>
          </div>
        </div>
      )}
    </div>
  );

}

export default Profile