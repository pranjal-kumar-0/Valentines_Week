import React, { useState, useEffect } from "react";
import {useLocation,useNavigate} from "react-router-dom";

const Day6 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name") || "Stranger";  

  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [nextDay, setNextDay] = useState(false);
  const [hearts, setHearts] = useState([]);

  const handleNextDay = () => {
    if (name.trim()){
        navigate(`/kissday?name=${encodeURIComponent(name)}`)
        } 
  };

  useEffect(() => {
    if (isFull) {
      setTimeout(() => {
        setNextDay(true);
      }, 4000);
    }
  }, [isFull]);
  
  useEffect(() => {
    let interval;

    if (isHolding && !isFull) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = Math.min(prev + 0.01, 1);
          if (newProgress === 1) {
            setIsFull(true);
          }
          return newProgress;
        });
      }, 100);
    } else if (!isHolding && !isFull) {
      interval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 0.005, 0));
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isHolding, isFull]);

  useEffect(() => {
    if (isFull) {
      const interval = setInterval(() => {
        setHearts((prev) => [
          ...prev,
          { id: Date.now(), left: Math.random() * 80 + 10 },
        ]);
      }, 350); 

      setTimeout(() => clearInterval(interval), 9000);
    }
  }, [isFull]);

  return (
    <div className="flex flex-col justify-center items-center h-screen relative overflow-hidden">
      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
          }
        `}
      </style>

      <div className="flex flex-col justify-center items-center bg-pink-500 min-w-[30rem] p-12 rounded-[2rem]">
        <p className="text-white font-bold text-[2rem]">Hug Day</p>

        <div className="w-[20rem] h-4 bg-white rounded-full mt-[1.5rem] overflow-hidden">
          <div
            className="h-full bg-pink-700 rounded-full transition-all duration-200"
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>

        {!isHolding && (
          <div className="flex mt-[2rem]">
            <img className="w-[8rem] mr-[3rem]" src="./hug/boy_hug.png" alt="Boy" />
            <img className="w-[8rem] h-[11.3rem] ml-[3rem]" src="./hug/girl_hug.png" alt="Girl" />
          </div>
        )}
        {isHolding && (
          <div className="flex mt-[2rem]">
            <img className="w-[11.2rem] mr-[3rem]" src="./hug/hug.png" alt="Hugging" />
          </div>
        )}

        <button
          className={`bg-pink-200 p-[0.8rem] rounded-[3rem] hover:bg-pink-300 font-semibold text-pink-900 mt-4 ${
            isFull ? "opacity-50 cursor-not-allowed" : "hover:cursor-pointer"
          }`}
          onMouseDown={() => !isFull && setIsHolding(true)}
          onMouseUp={() => !isFull && setIsHolding(false)}
          onMouseLeave={() => !isFull && setIsHolding(false)}
        >
          {isFull ? "Hug Complete 💖" : "Hold Hug"}
        </button>
      </div>

      {nextDay && (
        <button
          className="mt-[3rem] px-6 py-3 bg-pink-600 text-white font-semibold rounded-xl hover:bg-pink-700 transition-all duration-300 max-h-[4rem]"
          onClick={handleNextDay}
        >
          Next Day →
        </button>
      )}

      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-red-500 text-[2rem]"
          style={{
            left: `${heart.left}%`,
            bottom: "0%",
            animation: "floatUp 3s ease-out forwards",
          }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
};

export default Day6;
