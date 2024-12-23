import React, { useEffect, useState } from 'react';
import plant from '../../plantName';
import backgroundImage from '../Assects/Home_Background.jpg';
import PlantInfo from '../Components/PlantInfo';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [RandomPlant, setRandomPlant] = useState([]);
  const navigate = useNavigate();

  function TakeRandomPlants() {
    const selectPlants = [];
    for (let i = 0; i < 4; i++) {
      let index = Math.floor(Math.random() * plant.length);
      selectPlants[i] = plant[index];
    }
    console.log("Random Plants:", RandomPlant);
    console.log("access Token", localStorage.getItem('token'));
    setRandomPlant(selectPlants);
  }

  const goToPlant = () => {
    navigate('/plantInformation')
  }

  useEffect(() => TakeRandomPlants(), []);

  return (
    <>
      <div style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '90vh'
      }}
        className=''
      >

        <div className='font-extrabold text-blue-600 text-6xl flex justify-center'>This is the information about the Ayurveda my name is pranv
          
        </div>
        <div className='font-bold text-blue-600 flex justify-center mt-5 text-3xl'>Sub information about the Ayurveda</div>

      </div>



      <div>
        <div className='flex justify-center mt-10'>
          <div className='bg-gray-400 p-3 rounded-3xl font-extrabold text-2xl text-black'>
            Some Plant Information
          </div>
        </div>

        <div className='grid md:grid-cols-4 gap-4'>
          {RandomPlant.length !== 0 ? (RandomPlant.map((item, index) => (
            <PlantInfo key={index} data={item} />
          ))) : (<div>No Plant Found</div>)

          }
        </div>

        <div className="flex justify-center mb-4">
          <button onClick={goToPlant} className='bg-gray-400 p-2 rounded-2xl font-bold text-xl text-black hover:scale-110'>
            All Plant information
          </button>
        </div>
      </div>



    </>
  );
}

export default Home;
