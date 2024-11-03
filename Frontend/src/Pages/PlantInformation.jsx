import React, { useState } from 'react';
import plant from "../../plantName";
import PlantInfo from '../Components/PlantInfo';
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

function PlantInformation() {
  const [search, setSearch] = useState("Search a plant");
  const [filteredData, setFilteredData] = useState(plant);
  const navigate = useNavigate();

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
      setFilteredData(plant);
      return;
    };

    const filtered = plant.filter((item) =>
      item.Tags && item.Tags.some(tag => tag.toLowerCase() === search.toLowerCase().trim())
    );

    setFilteredData(filtered);
  }

  const handleNavigation = () => {
    navigate('/newPlant')
  }

  return (
    <div className='mt-3'>
      <form className='h-[10vh] p-6 bg-slate-500 flex justify-center font-sans' onSubmit={submitHandler}>
        <input
          type='text'
          className='border-2 border-black rounded-xl font-light h-6'
          value={search}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={changeHandler}
        />
        <button className='bg-green-500 ml-3 rounded-xl px-4 border-2 border-black h-6'>Search</button>
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

      <div className='bg-green-600 w-[2vw] p-2 rounded-full text-white font-extrabold hover:scale-125' onClick={handleNavigation}>
        <IoMdAdd />
      </div>
    </div>
  );
}

export default PlantInformation;