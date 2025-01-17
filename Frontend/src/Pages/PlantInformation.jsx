import React, { useEffect, useState } from 'react';
import plant from "../../plantName";
import PlantInfo from '../Components/PlantInfo';
import { IoMdAddCircle } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import Loader from '../Components/Loader';
import toast from 'react-hot-toast';

function PlantInformation() {
  const [search, setSearch] = useState("Search a plant");
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isLoding, setIsLoding] = useState(false);

  const getPlants = () => {
    setIsLoding(true);
    axios.get('https://ayurveda-backend.onrender.com/api/v1/getAllPlant', { withCredentials: true })
      .then((Response) => {
        //consolelog(Response.data.data);
        setFilteredData(Response.data.data);
        //consolelog(filteredData);
      })
      .catch((error) => {
        //consolelog(error);
      })
    setIsLoding(false);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      //consolelog(user);
    }

    getPlants();
  }, []);


  function handleFocus() {
    if (search === "Search a plant") {
      setSearch("");
    }
  }

  function handleBlur() {
    if (search === "") {
      setSearch("Search a plant");
    }
  }

  function changeHandler(event) {
    setSearch(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    if (search === "Search a plant" || search.trim() === "") {
      setFilteredData(plant);  // If no search term, show all plants
      return;
    };
  
    const filtered = filteredData.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase().trim()) // Modify 'name' to match the property you are searching
    );
  
    if (filtered.length > 0) {
      setFilteredData(filtered); // Set filtered results
    } else {
      setFilteredData([]); // No results found, clear the filteredData
      toast.error("No plants found matching the search term.");
    }
  }


  const handleNavigation = () => {
    navigate('/newPlant')
  }

  return (
    <div>
      {isLoding &&
        <Loader />
      }

      {!isLoding &&
        <div>
          <form className='h-[10vh] p-6 bg-blue-300 flex justify-center font-sans' onSubmit={submitHandler}>
            <input
              type='text'
              className='border-2 border-black rounded-xl font-light h-7 px-2'
              value={search}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={changeHandler}
            />
            <button className='bg-green-500 ml-3 rounded-xl px-2 border-2 border-black h-7'>Search</button>
          </form>

          <div className='flex justify-center items-center min-h-screen mx-16'>
            <div className='grid md:grid-cols-4 gap-4'>
              {
                filteredData.map((item, index) => (
                  <PlantInfo key={index} data={item} />
                ))
              }
            </div>
          </div>

          {
            (user.type === "Admin") &&
            <div className='w-full flex relative'>
              <IoMdAddCircle className='bg-[#964B00] md:w-[4vw] md:h-[4vw] md:p-2 rounded-full text-white font-extrabold  hover:scale-125  fixed bottom-10 right-10 w-[10vw] h-[10vw]' onClick={handleNavigation} />
            </div>
          }
        </div>
      }
    </div>
  );
}

export default PlantInformation;
