import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'
import Loader from "../../Components/Loader";
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import BlogList from '../../Assects/BlogList';

function Profile() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    userName: "",
    type: "",
    post: [],
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
          .get(`http://localhost:4000/api/v1/getUser`, {
            params: { email: email.toString() },
            withCredentials: true,
          })
          .then((response) => {
            console.log(response.data);
            setData(response.data.data);
          })
          .catch((error) => {
            console.error(error);
          });
    
        axios
          .get(`http://localhost:4000/api/v1/getUserPost`, { withCredentials: true })
          .then((response) => {
            console.log("Posts", response.data.data);
            setPost(response.data.data);
          })
          .catch((error) => {
            console.error(error);
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
          </div>
        )}
      </div>
    );
    
}

export default Profile