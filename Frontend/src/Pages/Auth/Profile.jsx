import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import axios from 'axios'

function Profile() {

  const [data, setData] = useState({
    name: "",
    email: "",
    userName: "",
    type: "",
    post: [],
  });

    const getData = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const email = decodedToken.email;
        axios
          .get(`http://localhost:4000/api/v1/getUser`, { params: { email: email.toString() }, withCredentials: true })
          .then((response) => {
            console.log(response.data);
            setData(response.data.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }

    useEffect(getData, []);

    // const data = {
    //   Name: "John Doe",
    //   Email: "q0v7b@example.com",
    //   userName: "johndoe",
    //   type: "User",
    // }

  return (
    <div>
        <div>Name: {data.name}</div>
        <div>Email: {data.email}</div>
        <div>userName: {data.userName}</div>
        <div>Role: {data.type}</div>
    </div>
  )
}

export default Profile