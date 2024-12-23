import React, { useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'

function Profile() {


    const getData = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const email = decodedToken.email;
        axios
          .get(`http://localhost:4000/api/v1/getUser`, { params: { email: email.toString() }, withCredentials: true })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }

    useEffect(getData, []);

    const data = {
      Name: "John Doe",
      Email: "q0v7b@example.com",
      userName: "johndoe",
      type: "User",
    }


  return (
    <div>
        <div>Name: {data.Name}</div>
        <div>Email: {data.Email}</div>
        <div>userName: {data.userName}</div>
        <div>Role: {data.type}</div>
    </div>
  )
}

export default Profile