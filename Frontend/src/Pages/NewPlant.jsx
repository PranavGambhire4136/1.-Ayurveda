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

      <div className="flex flex-col items-center m-4 gap-4 p-4 justify-center temple-bg">
        <div className="w-full max-w-2xl temple-card temple-border temple-shadow p-8">
          <h1 className="temple-heading text-2xl md:text-3xl mb-6 text-center">Add New Plant</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Plant Name Input */}
            <label className="flex flex-col gap-2">
              <div className="text-lg font-bold text-[var(--temple-brown)]">Plant Name</div>
              <input
                type="text"
                required
                className="temple-border rounded-lg px-3 py-2 text-[var(--temple-dark-green)] focus:outline-none focus:border-[var(--temple-gold)] focus:ring-2 focus:ring-[var(--temple-gold)]"
                name="name"
                placeholder='name'
                value={plantData.name}
                onChange={handleInputChange}
              />
            </label>

            {/* Plant Image Upload */}
            <label className="flex flex-col gap-2">
              <div className="text-lg font-bold text-[var(--temple-brown)]">Plant Image</div>
              <input
                type="file"
                accept="image/*"
                required
                className="temple-border rounded-lg px-3 py-2 text-[var(--temple-dark-green)] focus:outline-none focus:border-[var(--temple-gold)] focus:ring-2 focus:ring-[var(--temple-gold)]"
                onChange={handleFileChange}
              />
            </label>

            {/* Plant Information Input */}
            <label className="flex flex-col gap-2">
              <div className="text-lg font-bold text-[var(--temple-brown)]">Plant Information</div>
              <textarea
                type="text"
                required
                className="temple-border rounded-lg px-3 py-2 text-[var(--temple-dark-green)] focus:outline-none focus:border-[var(--temple-gold)] focus:ring-2 focus:ring-[var(--temple-gold)]"
                name="info"
                value={plantData.info}
                placeholder='Informationn'
                onChange={handleInputChange}
              />
            </label>

            {/* Tags Input */}
            <label className="flex flex-col gap-2">
              <div className="text-lg font-bold text-[var(--temple-brown)]">Tags (e.g., medicinal, decorative)</div>
              <input
                type="text"
                className="temple-border rounded-lg px-3 py-2 text-[var(--temple-dark-green)] focus:outline-none focus:border-[var(--temple-gold)] focus:ring-2 focus:ring-[var(--temple-gold)]"
                name="tags"
                value={plantData.tags}
                onChange={handleInputChange}
                placeholder='tags (helps to search plant)'
              />
            </label>

            {/* Diseases Input */}
            <label className="flex flex-col gap-2">
              <div className="text-lg font-bold text-[var(--temple-brown)]">Diseases Cured</div>
              <div className='text-sm text-[var(--temple-gold)]'>Enter values separated by commas</div>
              <input
                type="text"
                className="temple-border rounded-lg px-3 py-2 text-[var(--temple-dark-green)] focus:outline-none focus:border-[var(--temple-gold)] focus:ring-2 focus:ring-[var(--temple-gold)]"
                name="diseases"
                value={plantData.diseases}
                placeholder='diseases can cured'
                onChange={handleInputChange}
              />
            </label>

            {/* How It Works Input */}
            <label className="flex flex-col gap-2">
              <div className="text-lg font-bold text-[var(--temple-brown)]">How It Works</div>
              <input
                type="text"
                className="temple-border rounded-lg px-3 py-2 text-[var(--temple-dark-green)] focus:outline-none focus:border-[var(--temple-gold)] focus:ring-2 focus:ring-[var(--temple-gold)]"
                name="howItWorks"
                value={plantData.howItWorks}
                placeholder='working'
                onChange={handleInputChange}
              />
            </label>

            {/* Side Effects Input */}
            <label className="flex flex-col gap-2">
              <div className="text-lg font-bold text-[var(--temple-brown)]">Side Effects</div>
              <div className='text-sm text-[var(--temple-gold)]'>Enter values separated by commas</div>
              <input
                type="text"
                className="temple-border rounded-lg px-3 py-2 text-[var(--temple-dark-green)] focus:outline-none focus:border-[var(--temple-gold)] focus:ring-2 focus:ring-[var(--temple-gold)]"
                name="sideEffects"
                value={plantData.sideEffects}
                placeholder='side effects'
                onChange={handleInputChange}
              />
            </label>

            {/* Exceptions Input */}
            <label className="flex flex-col gap-2">
              <div className="text-lg font-bold text-[var(--temple-brown)]">Exceptions</div>
              <div className='text-sm text-[var(--temple-gold)]'>Enter values separated by commas</div>
              <input
                type="text"
                className="temple-border rounded-lg px-3 py-2 text-[var(--temple-dark-green)] focus:outline-none focus:border-[var(--temple-gold)] focus:ring-2 focus:ring-[var(--temple-gold)]"
                name="exceptions"
                value={plantData.exceptions}
                placeholder='exceptions'
                onChange={handleInputChange}
              />
            </label>

            {/* Availability Input */}
            <label className="flex flex-col gap-2">
              <div className="text-lg font-bold text-[var(--temple-brown)]">Availability</div>
              <div className='text-sm text-[var(--temple-gold)]'>Enter values separated by commas</div>
              <input
                type="text"
                className="temple-border rounded-lg px-3 py-2 text-[var(--temple-dark-green)] focus:outline-none focus:border-[var(--temple-gold)] focus:ring-2 focus:ring-[var(--temple-gold)]"
                name="availability"
                value={plantData.availability}
                placeholder='where it is available'
                onChange={handleInputChange}
              />
            </label>

            {/* Submit Button */}
            <button className="temple-btn w-full mt-4 py-2 text-lg font-semibold">
              Submit
            </button>
          </form>
        </div>
      </div>
}
</div>

      




  );
}

export default AddPlant;
