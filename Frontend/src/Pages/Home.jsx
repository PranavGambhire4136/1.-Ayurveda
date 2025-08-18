import React, { useEffect, useState } from 'react';
import backgroundImage from '../Assects/Home_Background.jpg';
import PlantInfo from '../Components/PlantInfo';
import { useNavigate } from 'react-router-dom';
import axios, { all } from 'axios';

function Home() {
  const [RandomPlant, setRandomPlant] = useState([]);
  const navigate = useNavigate();

  const fetchAndSetRandomPlants = async () => {
    try {
      const response = await axios.get('https://ayurveda-backend.onrender.com/api/v1/getAllPlant', { withCredentials: true });
      const allPlants = response.data.data;
      let selectPlants = [];

      if (allPlants.length < 4) {
        selectPlants = allPlants;
      } else {
        for (let i = 0; i < 4; i++) {
          let index = Math.floor(Math.random() * allPlants.length);
          selectPlants.push(allPlants[index]);
        }
      }

      setRandomPlant(selectPlants);
      //consolelog("Random Plants:", selectPlants);
    } catch (error) {
      //consoleerror("Error fetching plants:", error);
    }
  };


  const goToPlant = () => {
    navigate('/plantInformation');
  };

  useEffect(() => {
    fetchAndSetRandomPlants();
  }, []);

  return (
    <>
      <section
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
        className="temple-border rounded-b-3xl shadow-2xl mb-12 flex items-center justify-center relative overflow-hidden"
      >
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-black/30 md:bg-black/35 z-0" aria-hidden="true"></div>
        {/* Spiritual Motif and Glassmorphic Card */}
        <svg className="absolute left-0 top-0 opacity-15 z-0" width="220" height="120" viewBox="0 0 220 120" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="110" cy="60" rx="100" ry="35" fill="#c9a14a" fillOpacity="0.13"/><ellipse cx="120" cy="80" rx="80" ry="24" fill="#4caf50" fillOpacity="0.10"/></svg>
        <div className="relative z-10 bg-[var(--temple-offwhite)] bg-opacity-80 rounded-3xl px-10 py-14 md:px-32 md:py-20 flex flex-col items-center justify-center shadow-2xl temple-border max-w-3xl mx-auto mt-8 mb-8" style={{backdropFilter: 'blur(3px)'}}>
          <div className="mb-8">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="36" stroke="#c9a14a" strokeWidth="4" fill="#4caf50" fillOpacity="0.19" />
              <circle cx="40" cy="40" r="18" stroke="#c9a14a" strokeWidth="2.5" fill="#f8f5f0" />
              <path d="M40 20 L48 40 L40 60 L32 40 Z" fill="#c9a14a" fillOpacity="0.23" />
            </svg>
          </div>
          <h1 className="temple-heading text-5xl md:text-6xl font-extrabold text-center mb-6 tracking-wider navbar-text-shadow" style={{letterSpacing: '0.08em'}}>
            The Ancient Science of Ayurveda
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--temple-green)] text-center mb-6 navbar-text-shadow" style={{fontFamily: 'Noto Serif, Merriweather, serif'}}>
            A Holistic Approach to Health and Well-being
          </h2>
          <p className="text-xl md:text-2xl text-[var(--temple-brown)] text-center mb-4 px-2" style={{fontFamily: 'Merriweather, Georgia, serif'}}>
            Ayurveda, the timeless system of natural healing, originated in India over 5,000 years ago. It emphasizes harmony between body, mind, and spirit through balanced living.
          </p>
          <p className="text-xl md:text-2xl text-[var(--temple-dark-green)] text-center mb-2 px-2" style={{fontFamily: 'Merriweather, Georgia, serif'}}>
            Explore the principles of Ayurveda, learn about powerful herbs, and discover time-tested practices for achieving holistic wellness in today's world.
          </p>
        </div>
        <svg className="absolute bottom-0 left-0 opacity-15 z-0" width="180" height="90" viewBox="0 0 180 90" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="90" cy="45" rx="88" ry="22" fill="#4caf50" fillOpacity="0.10"/></svg>
        <svg className="absolute top-0 right-0 opacity-15 z-0" width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="60" cy="30" rx="58" ry="18" fill="#c9a14a" fillOpacity="0.09"/></svg>
      </section>

      <section className="mb-20 px-2">
        <div className="relative max-w-7xl mx-auto rounded-3xl shadow-2xl temple-border bg-[var(--temple-offwhite)] bg-opacity-95 px-4 md:px-16 py-16 flex flex-col items-center overflow-hidden">

          <h2 className="temple-heading text-4xl md:text-5xl text-center mb-3 font-extrabold tracking-wide navbar-text-shadow" style={{letterSpacing:'0.06em'}}>Featured Ayurvedic Plants</h2>
          <div className="text-xl md:text-2xl text-[var(--temple-green)] mb-10 text-center font-semibold navbar-text-shadow" style={{fontFamily: 'Noto Serif, Merriweather, serif'}}>Sacred herbs for health, healing, and spiritual balance</div>

          <div className="w-full flex flex-wrap justify-center gap-12 md:gap-16 z-10">
            {RandomPlant.length > 0 ? (
              RandomPlant.map((item, index) => (
                <PlantInfo key={index} data={item} />
              ))
            ) : (
              <div className="temple-card text-center text-[var(--temple-brown)] col-span-3">No Plant Found</div>
            )}
          </div>

          <div className="flex justify-center mt-14">
            <button onClick={goToPlant} className="temple-btn text-xl px-10 py-4 font-bold shadow-lg hover:scale-105 transition-all">All Plant Information</button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;