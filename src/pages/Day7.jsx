import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {useLocation,useNavigate} from "react-router-dom";

const Day7 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name") || "Stranger";

  const [boyPosition, setBoyPosition] = useState(0); 
  const [girlPosition, setGirlPosition] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [sliderState, setSliderState] = useState(false);
  const [nextDay, setNextDay] = useState(false);

  const handleNextDay = () => {
    if (name.trim()){
      navigate(`/valentineday?name=${encodeURIComponent(name)}`)
      } 
  }

  useEffect(() => {
    if (boyPosition == 160 && girlPosition == 180) {
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 10000);
      setSliderState(true);
      setTimeout(() => {
        setNextDay(true);
      }, 10000);
    }
  }, [boyPosition, girlPosition]);

  return (
    <div className="flex flex-col justify-center items-center h-screen relative overflow-hidden">
      <p className="text-[5rem] text-red-600 font-black">KISS DAY</p>
      {celebrate && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-red-500 text-4xl animate-heart"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}

      <div className="relative w-[50rem] h-[25rem] flex justify-center items-center overflow-hidden">
        <img
          className="h-[25rem] absolute left-0 transition-all duration-200"
          src="./kiss/boy_kiss.png"
          style={{ transform: `translateX(${boyPosition}px)` }}
        />

        <img
          className="h-[25rem] absolute right-0 transition-all duration-200"
          src="./kiss/girl_kiss.png"
          style={{ transform: `translateX(-${girlPosition}px)` }}
        />
      </div>
      <div className="w-full flex justify-between px-12 mt-8">
        <input
          type="range"
          min="0"
          max="160"
          disabled = {sliderState}
          value={boyPosition}
          onChange={(e) => setBoyPosition(parseInt(e.target.value))}
          className="w-[40%] appearance-none h-2 bg-gray-300 rounded-lg cursor-pointer"
        />
        <input
          type="range"
          min="220"
          max="400"
          disabled = {sliderState}
          value={400 - girlPosition}
          onChange={(e) => setGirlPosition(400 - parseInt(e.target.value))}
          className="w-[40%] appearance-none h-2 bg-gray-300 rounded-lg cursor-pointer"
        />
      </div>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
          }
          .animate-heart {
            animation: float 3s ease-in-out infinite;
          }
        `}
      </style>
      { nextDay && (
              <motion.button
                className="mt-[3.5rem] px-6 py-3 bg-pink-600 text-white font-semibold rounded-xl hover:bg-pink-700 transition-all duration-300 h-[4rem] max-h-[4rem]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNextDay}
              >
              Next Day →
              </motion.button>)
      }
    </div>
  );
};

export default Day7;
