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
    <div className="temple-bg min-h-screen py-8">
      <div className="container mx-auto">
        <div className='temple-border rounded-3xl mt-2 mx-6 md:mx-64 md:border-t-4 md:border-b-4 bg-[var(--temple-offwhite)] shadow temple-shadow'>
          <div className='temple-heading md:text-4xl text-2xl text-center m-4 md:m-6'>{plantInfo.Name}</div>
        </div>

        <div className='md:flex flex-row-reverse items-center mx-4 mt-8'>
          <div className='md:w-[50vw] md:h-[50vh] m-10 md:mr-20 flex justify-center items-center'>
            {plantInfo.Image && (
              <div className='w-full h-full overflow-hidden temple-card temple-border temple-shadow'>
                <img
                  src={plantInfo.Image}
                  alt="Plant"
                  className='rounded-2xl w-full h-full object-contain border-2 border-[var(--temple-gold)] bg-[var(--temple-offwhite)]'
                />
              </div>
            )}
          </div>

          <div className="temple-card temple-border temple-shadow bg-[var(--temple-offwhite)] max-w-2xl mx-auto">
            <div className='md:font-bold font-medium md:text-2xl text-lg text-[var(--temple-brown)]'>{plantInfo.Info}</div>

            <div className='mt-4'>
              <div className='md:font-semibold font-medium md:text-2xl mt-4 text-[var(--temple-green)]'>Diseases cured by this plant are:</div>
              <div>{commasepareatedDiseases}.</div>
            </div>

            <div>
              <div className='md:font-semibold font-medium md:text-2xl mt-4 text-[var(--temple-green)]'>Side Effects of this plant are:</div>
              <div>{commasepareatedSideEffects}.</div>
            </div>

            <div>
              <div className='md:font-semibold font-medium md:text-2xl mt-4 text-[var(--temple-green)]'>Avoid using this herb or plant in the following conditions:</div>
              <div>{commaSepareatedExceptions}.</div>
            </div>

            <div>
              <div className='md:font-semibold font-medium md:text-2xl mt-4 text-[var(--temple-green)]'>This plant is available in the regions of:</div>
              <div>{plantInfo.Availability || "Not Available"}.</div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className='temple-btn mt-8 mb-5 px-8 py-2 text-lg font-semibold'
            onClick={() => window.history.back()}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailPlantInfo;
