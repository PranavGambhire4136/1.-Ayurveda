import React, { useState } from 'react';
import image from "../../Assects/Chiapas_Rainforest_crop.jpg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


function SignUp() {
  const [selectAdmin, setSelectAdmin] = useState(false);
  const [otpSend, setOptSend] = useState(false);
  const [reotp, setReOtp] = useState(false);
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userName: '',
    password: '',
    confirmPassword: '',
    isAdmin: false,
    accessCode: '',
    otp: '',
  });

  function sendOtp() {
    if (!otpSend) {

      let type;
      if (formData.isAdmin) {
        type = "Admin";
      } else {
        type = "User"
      }

      axios.post('http://localhost:4000/api/v1/SignUpInit', { name: formData.name, userName: formData.userName, password: formData.password, confirmPassword: formData.confirmPassword, email: formData.email, profile: formData.profile, type: type, passkey: formData.passkey })
        .then((response) => {
          setOptSend(true);
          setReOtp(false);
          setTimeout(() => {
            setOptSend(false);
            setReOtp(true);
          }, 5 * 60 * 1000);
          toast.success("OTP Send successfully");
        }).catch(error => {
          toast.error(error.response.data.message);
        })
    } else {
      toast.error("OTP has already been sent.");
    }
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
    e.preventDefault();
    console.log(formData);
    //email and otp

    if (otpSend) {
      axios.post('http://localhost:4000/api/v1/SignUpComplete', { otp: formData.otp, email: formData.email })
        .then((response) => {
          toast.success(response.data.message);
          navigate("/login");
        }).catch(error => {
          toast.error(error.response.data.message);
        })
    } else {
      toast.error("Enter otp first");
    }
  };

  return (
    <div>
      <div>Sign UP</div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex justify-center p-5">
          <div className="w-full max-w-sm bg-green-500 p-5 rounded-md shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
              <label className="flex flex-col">
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border-2 border-black rounded-md p-2"
                />
              </label>

              <label className="flex flex-col">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border-2 border-black rounded-md p-2"
                />
              </label>

              <label className="flex flex-col">
                <span>Chose UserName</span>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="border-2 border-black rounded-md p-2"
                />
              </label>

              <label className="flex flex-col">
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="border-2 border-black rounded-md p-2"
                />
              </label>

              <label className="flex flex-col">
                <span>Confirm Password</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="border-2 border-black rounded-md p-2"
                />
              </label>

              <div className="flex flex-col">
                <span>Role</span>
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
                  <span>Enter the access code:</span>
                  <input
                    type="text"
                    name="accessCode"
                    value={formData.accessCode}
                    onChange={handleChange}
                    className="border-2 border-black rounded-md p-2"
                    required
                  />
                </label>
              )}

              <div>
                {!otpSend && !reotp && (
                  <div
                    className="border-2 border-black rounded-md p-2 bg-blue-300 hover:scale-105 w-11/12 cursor-pointer"
                    onClick={sendOtp}
                  >
                    Send OTP
                  </div>
                )}
              </div>

              <div>
                {reotp && (
                  <div
                    className="border-2 border-black rounded-md p-2 bg-blue-300 hover:scale-105 w-11/12 cursor-pointer"
                    onClick={sendOtp}
                  >
                    ReSend OTP
                  </div>
                )}
              </div>

              {(otpSend || reotp) && (
                <div className="w-11/12">
                  <div>
                    <input
                      type="text"
                      placeholder="Enter the OTP"
                      className="border-2 border-black rounded-md p-2 w-full"
                      name="otp"
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className="border-2 border-black rounded-md p-2 bg-blue-300 hover:scale-105 mt-3 w-full"
                  >
                    Submit
                  </button>
                </div>
              )}
            </form>

            <button className="border-2 border-black rounded-md p-2 bg-blue-300 hover:scale-105 mt-3 w-full" onClick={() => navigate("/login")}>Already have an account?</button>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2">
          <img
            src={image}
            className="h-[80vh] w-full object-cover"
            alt="Chiapas Rainforest"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
