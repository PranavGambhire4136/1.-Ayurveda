import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlantInfo({ data }) {
  //consolelog("data: ", data);

  const [info, setInfo] = useState(
    data.Info?.length > 50 ? data.Info.slice(0, 50) + "..." : data.Info
  );

  function changeName(event) {
    event.preventDefault();
    if (!data.Info) return; // Ensure Info exists
    setInfo((prevInfo) =>
      prevInfo === data.Info ? data.Info.slice(0, 50) + "..." : data.Info
    );
  }

  return (
    <form className="bg-green-300 md:w-[30vw] m-10 shadow-lg rounded-lg p-4 hover:scale-105 transition-transform">
      <div className="font-extrabold px-8 mb-5 overflow-scroll scrollbar-hide">
        {data.Name}
      </div>

      <div className="text-sm text-gray-700 mb-4">
        <div>{info}</div>
        <button
          onClick={changeName}
          className="bg-green-400 px-2 py-1 rounded-lg text-sm font-medium hover:scale-105 transition-transform"
        >
          {info !== data.Info ? <div>Read More</div> : <div>Read Less</div>}
        </button>
      </div>

      <div className="flex justify-center mb-4">
        <img
          src={data.Image || "path/to/default-image.jpg"}
          className="h-56 w-56 object-cover rounded-md"
          alt="Plant"
        />
      </div>

      <Link to={`/plantInformation/${encodeURIComponent(data.Name)}`}>
        <button className="mt-4 px-4 py-2 bg-green-400 rounded-md text-sm font-medium hover:scale-105 transition-transform">
          Know More
        </button>
      </Link>
    </form>
  );
}

export default PlantInfo;
