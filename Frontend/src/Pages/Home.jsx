import React, { useEffect, useState } from 'react';
import backgroundImage from '../Assects/Home_Background.jpg';
import PlantInfo from '../Components/PlantInfo';
import { useNavigate } from 'react-router-dom';
import axios, { all } from 'axios';

function Home() {
  const [RandomPlant, setRandomPlant] = useState([]);
  const navigate = useNavigate();

  const fetchAndSetRandomPlants = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/getAllPlant', { withCredentials: true });
      const allPlants = response.data.data;
      let selectPlants = []; 
  
      if (allPlants.length < 4) {
        selectPlants = allPlants;
      } else {
        for (let i = 0; i < 4; i++) {
          let index = Math.floor(Math.random() * allPlants.length);
          selectPlants.push(allPlants[index]);
        }
      }
  
      setRandomPlant(selectPlants);
      console.log("Random Plants:", selectPlants);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };
  

  const goToPlant = () => {
    navigate('/plantInformation');
  };

  useEffect(() => {
    fetchAndSetRandomPlants();
  }, []);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '90vh'
        }}
      >
        <div className="font-extrabold text-blue-600 text-6xl flex justify-center">
          This is the information about Ayurveda, my name is Pranv
        </div>
        <div className="font-bold text-blue-600 flex justify-center mt-5 text-3xl">
          Sub-information about Ayurveda
        </div>
      </div>

      <div>
        <div className="flex justify-center mt-10">
          <div className="bg-gray-400 p-3 rounded-3xl font-extrabold text-2xl text-black">
            Some Plant Information
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-5">
          {RandomPlant.length > 0 ? (
            RandomPlant.map((item, index) => (
              <PlantInfo key={index} data={item} />
            ))
          ) : (
            <div className="text-center text-red-500">No Plant Found</div>
          )}
        </div>

        <div className="flex justify-center mb-4 mt-8">
          <button
            onClick={goToPlant}
            className="bg-gray-400 p-2 rounded-2xl font-bold text-xl text-black hover:scale-110 transition-transform"
          >
            All Plant Information
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;