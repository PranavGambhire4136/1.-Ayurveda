import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlantInfo({ data }) {
  const [info, setInfo] = useState(
    data.Info?.length > 50 ? data.Info.slice(0, 50) + "..." : data.Info
  );

  function changeName(event) {
    event.preventDefault();
    if (!data.Info) return;
    setInfo((prevInfo) =>
      prevInfo === data.Info ? data.Info.slice(0, 50) + "..." : data.Info
    );
  }

  return (
    <div className="relative flex flex-col items-center w-full max-w-xs m-6 group min-h-[480px]">


      {/* Card container */}
      <div className="relative z-10 w-full rounded-3xl border-2 border-[var(--temple-gold)] shadow-2xl bg-gradient-to-br from-[var(--temple-green)] via-[var(--temple-leaf)] to-[var(--temple-gold)] bg-opacity-95 px-7 pt-20 pb-10 flex flex-col items-center overflow-visible min-h-[420px]">
        
        {/* Floating image */}
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 z-20 shadow-lg rounded-full border-4 border-[var(--temple-gold)] bg-[var(--temple-offwhite)] p-1"
          style={{
            width: "130px",
            height: "130px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={data.Image || "path/to/default-image.jpg"}
            className="h-[110px] w-[110px] object-cover rounded-full"
            alt="Plant"
          />
        </div>

        {/* Plant name */}
        <div
          className="temple-heading text-2xl md:text-2xl font-extrabold text-center mb-3 w-full truncate text-[var(--temple-gold)] navbar-text-shadow mt-2"
          style={{ letterSpacing: "0.05em" }}
          title={data.Name}
        >
          {data.Name}
        </div>

        {/* Info box */}
        <div className="w-full bg-[var(--temple-offwhite)] bg-opacity-90 rounded-xl shadow p-6 mb-6 text-[var(--temple-dark-green)] text-base md:text-lg text-center font-medium backdrop-blur-sm min-h-[90px]">
          <div>{info}</div>
          {data.Info && data.Info.length > 50 && (
            <button
              onClick={changeName}
              className="mt-3 flex items-center gap-2 px-6 py-3 rounded-full font-bold text-base bg-gradient-to-r from-[var(--temple-gold)] via-[var(--temple-leaf)] to-[var(--temple-green)] text-white border-2 border-[var(--temple-gold)] shadow-[0_0_24px_0_rgba(76,175,80,0.18)] relative focus:outline-none focus:ring-2 focus:ring-[var(--temple-gold)] focus:ring-offset-2 animate-pulse-btn transition-all duration-200 hover:scale-105 hover:shadow-[0_0_36px_8px_rgba(201,161,74,0.28)] group"
              style={{ fontSize: "1.08em", letterSpacing: "0.045em" }}
              aria-label={
                info !== data.Info
                  ? "Read More about " + data.Name
                  : "Read Less about " + data.Name
              }
            >
              <span className="inline-block transition-transform duration-300 group-hover:rotate-12">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="11"
                    cy="11"
                    rx="10"
                    ry="8"
                    fill="#c9a14a"
                    fillOpacity="0.18"
                  />
                  <path
                    d="M11 4 Q13 10 11 18 Q9 10 11 4Z"
                    fill="#4caf50"
                    fillOpacity="0.58"
                  />
                  <ellipse
                    cx="11"
                    cy="12"
                    rx="2.5"
                    ry="1.2"
                    fill="#fff"
                    fillOpacity="0.7"
                  />
                </svg>
              </span>
              <span>{info !== data.Info ? "Read More" : "Read Less"}</span>
              <style>{`
                .animate-pulse-btn {
                  animation: pulse-btn 2.2s infinite;
                }
                @keyframes pulse-btn {
                  0% { box-shadow: 0 0 16px 0 rgba(201,161,74,0.12); }
                  60% { box-shadow: 0 0 36px 10px rgba(201,161,74,0.22); }
                  100% { box-shadow: 0 0 16px 0 rgba(201,161,74,0.12); }
                }
              `}</style>
            </button>
          )}
        </div>

        {/* Know More button */}
        <Link
          to={`/plantInformation/${encodeURIComponent(data.Name)}`}
          className="w-full flex justify-center"
        >
          <button className="w-full py-2 text-base font-bold rounded-xl bg-gradient-to-r from-[var(--temple-gold)] via-[var(--temple-leaf)] to-[var(--temple-green)] text-white navbar-text-shadow shadow-lg hover:from-[var(--temple-leaf)] hover:to-[var(--temple-gold)] hover:scale-105 transition-all mt-2">
            Know More
          </button>
        </Link>
      </div>
    </div>
  );
}

export default PlantInfo;
