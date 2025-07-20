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
  }

  const filtered = filteredData.filter((item) =>
    item && item.Tags && item.Tags.some(tag => tag.toLowerCase().includes(search.toLowerCase().trim())) // Check if any tag matches
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
    <div className="min-h-screen w-full bg-gradient-to-br from-[var(--temple-green)] via-[var(--temple-leaf)] to-[var(--temple-gold)] pb-12">
      {isLoding && <Loader />}

      {!isLoding && (
        <>
          {/* Hero Section */}
          <section className="relative w-full flex flex-col items-center justify-center pt-12 pb-8 mb-8">
            <div className="text-md md:text-lg text-[var(--temple-offwhite)] text-center max-w-2xl mx-auto navbar-text-shadow">Search and discover the plants that form the foundation of Ayurveda’s holistic healing tradition.</div>
          </section>

          {/* Search Bar */}
          <form className='w-full max-w-2xl mx-auto p-6 bg-[var(--temple-offwhite)] bg-opacity-90 flex justify-center items-center rounded-2xl shadow-xl temple-border mb-10 relative z-10' onSubmit={submitHandler}>
            <input
              type='text'
              className='temple-border rounded-xl font-light h-12 px-6 py-2 text-lg mr-3 focus:border-[var(--temple-gold)] focus:ring-2 focus:ring-[var(--temple-gold)] outline-none bg-[var(--temple-light)] shadow'
              value={search}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={changeHandler}
              placeholder="Search a plant"
              style={{minWidth: '240px'}}
            />
            <button className='temple-btn h-12 px-8 text-lg font-bold'>Search</button>
          </form>

          {/* Plant Grid Section - Cohesive with Home Featured Section */}
          <section className="mb-20 px-2 w-full flex flex-col items-center">
            <div className="relative max-w-7xl w-full mx-auto rounded-3xl shadow-2xl temple-border bg-[var(--temple-offwhite)] bg-opacity-95 px-4 md:px-16 py-16 flex flex-col items-center overflow-hidden">
              {/* Leafy SVG background motif */}
              <svg className="absolute left-0 top-0 opacity-10 z-0" width="260" height="120" viewBox="0 0 260 120" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="130" cy="60" rx="120" ry="38" fill="#4caf50" fillOpacity="0.10"/><ellipse cx="180" cy="80" rx="70" ry="20" fill="#c9a14a" fillOpacity="0.08"/></svg>
              <svg className="absolute right-0 bottom-0 opacity-10 z-0" width="180" height="90" viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="90" cy="45" rx="88" ry="22" fill="#4caf50" fillOpacity="0.09"/></svg>
              <h2 className="temple-heading text-4xl md:text-5xl text-center mb-3 font-extrabold tracking-wide navbar-text-shadow" style={{letterSpacing:'0.06em'}}>All Ayurvedic Plants</h2>
              <div className="text-xl md:text-2xl text-[var(--temple-green)] mb-10 text-center font-semibold navbar-text-shadow" style={{fontFamily: 'Noto Serif, Merriweather, serif'}}>Explore the sacred green wisdom of Ayurveda</div>
              <div className='w-full flex flex-wrap justify-center gap-12 md:gap-16 z-10'>
                {
                  filteredData.map((item, index) => (
                    <PlantInfo key={index} data={item} />
                  ))
                }
              </div>
            </div>
          </section>

          {/* Admin Add Button */}
          {user.type === "Admin" && (
            <div className='w-full flex relative z-20'>
              <IoMdAddCircle className='bg-[var(--temple-gold)] text-[var(--temple-dark-green)] md:w-[4vw] md:h-[4vw] md:p-2 rounded-full font-extrabold hover:scale-125 fixed bottom-10 right-10 w-[12vw] h-[12vw] shadow-xl temple-shadow border-4 border-[var(--temple-green)] transition-transform duration-200' onClick={handleNavigation} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PlantInformation;
