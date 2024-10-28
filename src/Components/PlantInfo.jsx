import { Link } from "react-router-dom";

function PlantInfo({ data }) {
 return (
    <form className="bg-green-300 md:w-[20vw] m-10 shadow-lg rounded-lg p-4">
      <div className="font-extrabold px-8 mb-5 overflow-scroll">{data.Name}</div>
      <div className="text-sm text-gray-700 mb-4">{data.Info.slice(0, 50) + "..."}</div>
      <div className="flex justify-center mb-4">
        <img
          src={data.Image}
          className="h-56 w-56 object-cover rounded-md"
          alt="Plant"
        />
      </div>
      <Link to = {`/plantInformation/${data.Name}`} >
        <button className="mt-4 px-4 py-2 bg-green-400 rounded-md text-sm font-medium">
          Know More
        </button>
      </Link>
    </form>
  );
}

export default PlantInfo;
