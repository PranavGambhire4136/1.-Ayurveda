import React from 'react'
import { useParams } from 'react-router-dom'

function DetailPlantInfo() {

    const {id} = useParams();
    console.log(id);

  return (
    <div>DetailPlantInfo</div>
  )
}

export default DetailPlantInfo