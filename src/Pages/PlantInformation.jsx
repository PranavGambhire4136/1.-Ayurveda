import React from 'react';
import plant from "../../plantName";
import PlantInfo from '../Components/PlantInfo';

function PlantInformation() {
  return (
    <div>
      {
        plant.map((item, index) => (
          <PlantInfo key={index} data={item} />
        ))
      }
    </div>
  );
}

export default PlantInformation;
