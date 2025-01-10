import React, { useState } from 'react';
import image from "../../Assects/Chiapas_Rainforest_crop.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../../Components/Loader.jsx';

function SignUp() {
  const [selectAdmin, setSelectAdmin] = useState(false);
  const [otpSend, setOptSend] = useState(false);
  const [reotp, setReOtp] = useState(false);
  const navigate = useNavigate();
  const [isLoding, setIsLoding] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
    isAdmin: false,
    accessCode: '',
    otp: '',
    passkey: '',
  });

  function sendOtp() {
    setIsLoding(true);
    toast('Sending OTP, please wait...');
    if (!otpSend) {
      const type = formData.isAdmin ? "Admin" : "User";

      // console.log("Passkey", formData.passkey);

      axios
        .post('https://ayurveda-backend.onrender.com/api/v1/SignUpInit', {
          name: formData.name,
          userName: formData.userName,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          email: formData.email,
          profile: formData.profile,
          type: type,
          passkey: formData.passkey,
        })
        .then(() => {
          setOptSend(true);
          setReOtp(false);
          setTimeout(() => {
            setOptSend(false);
            setReOtp(true);
          }, 5 * 60 * 1000);
          toast.success("OTP sent successfully");
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || "Error sending OTP");
        });
    } else {
      toast.error("OTP has already been sent.");
    }
    setIsLoding(false);
  }

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

  const handleSubmit = async (e) => {
    setIsLoding(true);
    e.preventDefault();

    if (otpSend) {
      axios
        .post('api/SignUpComplete', {
          otp: formData.otp,
          email: formData.email,
        })
        .then((response) => {
          toast.success(response.data.message);
          navigate("/login");
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || "Error completing signup");
        });
    } else {
      toast.error("Please enter the OTP first.");
    }
    setIsLoding(false);
  };

  return (
    <div>
      {isLoding && <Loader />}

      {!isLoding && (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-green-100 to-green-200">
          <div className="text-4xl font-extrabold text-green-700 mt-8 mb-5">Sign Up</div>
          <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Form Section */}
            <div className="w-full md:w-1/2 p-6">
              <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                <label className="flex flex-col">
                  <span className="text-green-800 font-medium">Name</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-2 border-green-300 rounded-md p-2 focus:outline-none focus:border-green-500"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-green-800 font-medium">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-2 border-green-300 rounded-md p-2 focus:outline-none focus:border-green-500"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-green-800 font-medium">Choose Username</span>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    className="border-2 border-green-300 rounded-md p-2 focus:outline-none focus:border-green-500"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-green-800 font-medium">Password</span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border-2 border-green-300 rounded-md p-2 focus:outline-none focus:border-green-500"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-green-800 font-medium">Confirm Password</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="border-2 border-green-300 rounded-md p-2 focus:outline-none focus:border-green-500"
                  />
                </label>

                <div className="flex flex-col">
                  <span className="text-green-800 font-medium">Role</span>
                  <div className="flex space-x-3">
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
                  <label className="flex flex-col">
                    <span className="text-green-800 font-medium">Enter Access Code</span>
                    <input
                      type="text"
                      name="passkey"
                      value={formData.passkey}
                      onChange={handleChange}
                      className="border-2 border-green-300 rounded-md p-2 focus:outline-none focus:border-green-500"
                    />
                  </label>
                )}

                {!otpSend && !reotp && (
                  <div
                    className="text-center border-2 border-green-300 bg-green-600 text-white rounded-md p-2 hover:bg-green-700 cursor-pointer transition"
                    onClick={sendOtp}
                  >
                    Send OTP
                  </div>
                )}

                {reotp && (
                  <div
                    className="text-center border-2 border-green-300 bg-green-600 text-white rounded-md p-2 hover:bg-green-700 cursor-pointer transition"
                    onClick={sendOtp}
                  >
                    Resend OTP
                  </div>
                )}

                {(otpSend || reotp) && (
                  <div>
                    <input
                      type="text"
                      placeholder="Enter the OTP"
                      className="border-2 border-green-300 rounded-md p-2 w-full focus:outline-none focus:border-green-500"
                      name="otp"
                      onChange={handleChange}
                    />
                    <button
                      type="submit"
                      className="w-full text-center border-2 border-green-300 bg-green-600 text-white rounded-md p-2 hover:bg-green-700 mt-3 transition"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </form>

              <button
                className="w-full text-center border-2 border-green-300 bg-green-600 text-white rounded-md p-2 hover:bg-green-700 mt-3 transition"
                onClick={() => navigate("/login")}
              >
                Already have an account?
              </button>
            </div>
            {/* Image Section */}
            <div className="hidden md:block md:w-1/2">
              <img
                src={image}
                className="h-full w-full object-cover"
                alt="Chiapas Rainforest"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
