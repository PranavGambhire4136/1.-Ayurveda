import React from 'react'
import { useParams } from 'react-router-dom'
import plant from "../../plantName";


function DetailPlantInfo() {
    const {id} = useParams();
    const plantInfo = plant.find((item) => item.Name == id);
    const commasepareatedDiseases = plantInfo.Diseases.join(", ");
    const commasepareatedSideEffects = plantInfo.SideEffects.join(", ");
    const commaSepareatedExceptions = plantInfo.Exceptions.join(", ");


  return (
    <div>
      <div className='border-t-2 border-b-2 border-red-400 mt-2 mx-6 md:mx-64 md:border-t-4 md:border-b-4'>
        <div className='md:font-bold font-extrabold md:text-4xl text-xl text-center m-4 md:m-6'>{plantInfo.Name}</div>
      </div>


      <div className='md:flex flex-row-reverse items-center mx-4'>

          <div className='md:w-[50vw] md:h-[50vh] m-10 md:mr-20'>
            {
              plantInfo.Image && <div><img src = {plantInfo.Image} className='rounded-2xl'/></div>
            }
          </div>
        <div>


          <div className='md:font-bold font-medium md:text-2xl text-lg'>{plantInfo.Info}</div>

          <div className='mt-4'>
            <div className='md:font-semibold font-medium md:text-2xl mt-4'>Diseases cured by this plant are: </div>
            <div>{commasepareatedDiseases}.</div>
          </div>
          
          <div>
            <div className='md:font-semibold font-medium md:text-2xl mt-4'>SideEffect of this plant are:</div>
            <div>{commasepareatedSideEffects}.</div>
          </div>

          <div>
            <div className='md:font-semibold font-medium md:text-2xl mt-4'>avoid using this herb or plant in the following conditions</div>
            <div>{commaSepareatedExceptions}.</div>
          </div>

          <div>
            <div className='md:font-semibold font-medium md:text-2xl mt-4'>This plant is avaliable in the regions of:</div>
            <div>{plantInfo.Availability}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button className='bg-[#0042b0] px-4 py-1 rounded-lg text-sm font-medium hover:scale-105 mt-4 mb-5 text-neutral-50' onClick={() => window.history.back()} >Back</button>
      </div>

    </div>
  )
}

export default DetailPlantInfo