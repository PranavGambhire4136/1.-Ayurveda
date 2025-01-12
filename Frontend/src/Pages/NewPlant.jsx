import React, { useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../Components/Loader';

function AddPlant() {

  const navigate = useNavigate();

  const [plantData, setPlantData] = useState({
    name: "",
    image: "",
    info: "",
    tags: "",
    diseases: "",
    howItWorks: "",
    sideEffects: "",
    exceptions: "",
    availability: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlantData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input change (store file directly in state)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPlantData((prevData) => ({
        ...prevData,
        image: file, // Store the file directly
      }));
    }
  };

  // Submit the form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setIsLoading(true);
    // Prepare data to send as JSON
    const dataToSend = {
      Name: plantData.name,
      Image: plantData.image, // base64 encoded string
      Info: plantData.info,
      Tags: plantData.tags,
      Disease: plantData.diseases,
      HowItWorks: plantData.howItWorks,
      SideEffects: plantData.sideEffects,
      Exceptions: plantData.exceptions,
      Availability: plantData.availability,
    };
  

  
    try {
      const response = await axios.post('https://ayurveda-backend.onrender.com/api/v1/addPlant', dataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true
      });
  
      // Handle successful response
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // toast.error("Error while adding plant. Please try again.");
      toast.error(error.response.data.message);
    }
    setIsLoading(false);
  };

  return (

    <div>

      {isLoading &&
        <Loader />
      }


      {!isLoading &&

      <div className="flex flex-col items-center m-4 gap-4 p-4 justify-center bg-white rounded-lg shadow-lg md:p-10">
        <h1 className="text-3xl font-bold text-green-500 mb-4 text-center">Add New Plant</h1>
        <form className="bg-white p-3 md:p-10 flex flex-col gap-4 ml-0 mr-0" onSubmit={handleSubmit}>

          {/* Plant Name Input */}
          <label className="flex flex-col gap-2">
            <div className="text-lg font-bold text-gray-600">Plant Name</div>
            <input
              type="text"
              required
              className="p-2 border border-gray-300 rounded-lg w-full"
              name="name"
              value={plantData.name}
              onChange={handleInputChange}
            />
          </label>

          {/* Plant Image Upload */}
          <label className="flex flex-col gap-2">
            <div className="text-lg font-bold text-gray-600">Plant Image</div>
            <input
              type="file"
              accept="image/*"
              required
              className="p-2 border border-gray-300 rounded-lg w-full"
              onChange={handleFileChange}
            />
          </label>

          {/* Plant Information Input */}
          <label className="flex flex-col gap-2">
            <div className="text-lg font-bold text-gray-600">Plant Information</div>
            <textarea
              type="text"
              required
              className="p-2 border border-gray-300 rounded-lg w-full"
              name="info"
              value={plantData.info}
              onChange={handleInputChange}
            />
          </label>

          {/* Tags Input */}
          <label className="flex flex-col gap-2">
            <div className="text-lg font-bold text-gray-600">Tags (e.g., medicinal, decorative)</div>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-lg w-full"
              name="tags"
              value={plantData.tags}
              onChange={handleInputChange}
            />
          </label>

          {/* Diseases Input */}
          <label className="flex flex-col gap-2">
            <div className="text-lg font-bold text-gray-600">Diseases Cured</div>
            <div className='text-sm text-red-500'>Enter values separated by commas</div>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-lg w-full"
              name="diseases"
              value={plantData.diseases}
              onChange={handleInputChange}
            />
          </label>

          {/* How It Works Input */}
          <label className="flex flex-col gap-2">
            <div className="text-lg font-bold text-gray-600">How It Works</div>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-lg w-full"
              name="howItWorks"
              value={plantData.howItWorks}
              onChange={handleInputChange}
            />
          </label>

          {/* Side Effects Input */}
          <label className="flex flex-col gap-2">
            <div className="text-lg font-bold text-gray-600">Side Effects</div>
            <div className='text-sm text-red-500'>Enter values separated by commas</div>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-lg w-full"
              name="sideEffects"
              value={plantData.sideEffects}
              onChange={handleInputChange}
            />
          </label>

          {/* Exceptions Input */}
          <label className="flex flex-col gap-2">
            <div className="text-lg font-bold text-gray-600">Exceptions</div>
            <div className='text-sm text-red-500'>Enter values separated by commas</div>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-lg w-full"
              name="exceptions"
              value={plantData.exceptions}
              onChange={handleInputChange}
            />
          </label>

          {/* Availability Input */}
          <label className="flex flex-col gap-2">
            <div className="text-lg font-bold text-gray-600">Availability</div>
            <div className='text-sm text-red-500'>Enter values separated by commas</div>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-lg w-full"
              name="availability"
              value={plantData.availability}
              onChange={handleInputChange}
            />
          </label>

          {/* Submit Button */}
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full mt-4">
            Submit
          </button>
        </form>
      </div>
}
    </div>

      




  );
}

export default AddPlant;
