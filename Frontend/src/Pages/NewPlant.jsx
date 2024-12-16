import React from 'react';

function NewPlant() {
  return (
    <div className="flex flex-col items-center m-4 gap-4 p-4 justify-center bg-white rounded-lg shadow-lg md:p-10">
      <h1 className="text-3xl font-bold text-green-500 mb-4 text-center">Add New Plant</h1>
      <form className="bg-white p-3 md:p-10 flex flex-col gap-4 ml-0 mr-0">
        <label className="flex flex-col gap-2">
          <div className="text-lg font-bold text-gray-600">Plant Name</div>
          <input type="text" required className="p-2 border border-gray-300 rounded-lg w-full" />
        </label>

        <label className="flex flex-col gap-2">
          <div className="text-lg font-bold text-gray-600">Plant Image</div>
          <input type="file" accept="image/*" required className="p-2 border border-gray-300 rounded-lg w-full" />
        </label>

        <label className="flex flex-col gap-2">
          <div className="text-lg font-bold text-gray-600">Plant Information</div>
          <input type="text" required className="p-2 border border-gray-300 rounded-lg w-full" />
        </label>

        <label className="flex flex-col gap-2">
          <div className="text-lg font-bold text-gray-600">Disease can cured</div>
          <input type="text" className="p-2 border border-gray-300 rounded-lg w-full" />
        </label>

        <label className="flex flex-col gap-2">
          <div className="text-lg font-bold text-gray-600">Side Effects</div>
          <input type="text" className="p-2 border border-gray-300 rounded-lg w-full" />
        </label>

        <label className="flex flex-col gap-2">
          <div className="text-lg font-bold text-gray-600">Conditions where not to use</div>
          <input type="text" className="p-2 border border-gray-300 rounded-lg w-full" />
        </label>

        <label className="flex flex-col gap-2">
          <div className="text-lg font-bold text-gray-600">Where does this plant grow</div>
          <input type="text" className="p-2 border border-gray-300 rounded-lg w-full" />
        </label>

        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full mt-4">Submit</button>
      </form>
    </div>
  );
}

export default NewPlant;