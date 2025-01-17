import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Components/Loader';

function DetailPlantInfo() {
  const { id } = useParams();
  const [plantInfo, setPlantInfo] = useState(null);
  const [error, setError] = useState(null);

  const getPlant = async () => {
    try {
      const res = await axios.get('https://ayurveda-backend.onrender.com/api/v1/getPlantDetail', { withCredentials: true, params: { id } });
      setPlantInfo(res.data.data);
      // //console..log(res);
    } catch (err) {
      // //console..errror("Error fetching plant details:", err);
      setError(err.response?.data?.message || "Failed to fetch plant details.");
    }
  };

  useEffect(() => {
    if (id) getPlant();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!plantInfo) {
    return <Loader />;
  }

  const commasepareatedDiseases = plantInfo.Disease?.join(", ") || "Not Available";
  const commasepareatedSideEffects = plantInfo.SideEffects?.join(", ") || "Not Available";
  const commaSepareatedExceptions = plantInfo.Exceptions?.join(", ") || "Not Available";

  return (
    <div>
      <div className='border-t-2 border-b-2 border-red-400 mt-2 mx-6 md:mx-64 md:border-t-4 md:border-b-4'>
        <div className='md:font-bold font-extrabold md:text-4xl text-xl text-center m-4 md:m-6'>{plantInfo.Name}</div>
      </div>

      <div className='md:flex flex-row-reverse items-center mx-4'>

        <div className='md:w-[50vw] md:h-[50vh] m-10 md:mr-20 flex justify-center items-center'>
          {plantInfo.Image && (
            <div className='w-full h-full overflow-hidden'>
              <img
                src={plantInfo.Image}
                alt="Plant"
                className='rounded-2xl w-full h-full object-contain'
              />
            </div>
          )}
        </div>

        <div>
          <div className='md:font-bold font-medium md:text-2xl text-lg'>{plantInfo.Info}</div>

          <div className='mt-4'>
            <div className='md:font-semibold font-medium md:text-2xl mt-4'>Diseases cured by this plant are:</div>
            <div>{commasepareatedDiseases}.</div>
          </div>

          <div>
            <div className='md:font-semibold font-medium md:text-2xl mt-4'>Side Effects of this plant are:</div>
            <div>{commasepareatedSideEffects}.</div>
          </div>

          <div>
            <div className='md:font-semibold font-medium md:text-2xl mt-4'>Avoid using this herb or plant in the following conditions:</div>
            <div>{commaSepareatedExceptions}.</div>
          </div>

          <div>
            <div className='md:font-semibold font-medium md:text-2xl mt-4'>This plant is available in the regions of:</div>
            <div>{plantInfo.Availability || "Not Available"}.</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          className='bg-[#0042b0] px-4 py-1 rounded-lg text-sm font-medium hover:scale-105 mt-4 mb-5 text-neutral-50'
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default DetailPlantInfo;
