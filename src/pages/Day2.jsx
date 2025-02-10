import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import {useNavigate} from "react-router-dom";

const Day2 = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name") || "Stranger";

  const [noSize, setNoSize] = useState(1);
  const [yesSize, setYesSize] = useState(1);
  const [stage, setStage] = useState(1);

  const handleNextDay = () => {
    if (name.trim()){
      navigate(`/chocolateday?name=${encodeURIComponent(name)}`)
    }
  }

  const handleNoClick = () => {
    if (stage < 6) {
      setNoSize((prev) => Math.max(prev - 0.2, 0.2));
      setYesSize((prev) => prev + 0.2);
      setStage((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center bg-pink-500 min-w-[30rem] p-12 rounded-[2rem]">
        <p className="text-white font-bold text-[2rem]">Propose Day</p>
        <p className="font-semibold text-gray-100 text-[1.5rem] mt-[1rem] mb-[0.5rem]">
          uhm..will you be my{" "}
          <span className="text-yellow-300 font-sans text-[1.6rem]">
            valentine
          </span>{" "}
          ?
        </p>
        <img className="max-h-[15rem]" src="./frog.png" />

        {stage < 6 ? (
          <div className="flex">
            <button
              onClick={handleNextDay}
              style={{ transform: `scale(${yesSize})` }}
              className="bg-green-600 p-[0.3rem] mt-[1rem] mr-[1rem] text-[1.3rem] text-white rounded-[1rem] w-[5rem] 
                        hover:cursor-pointer hover:bg-green-700 transition-all duration-300"
            >
              Yes💗
            </button>
            <button
              onClick={handleNoClick}
              style={{ transform: `scale(${noSize})` }}
              className="bg-red-700 p-[0.3rem] text-white mt-[1rem] ml-[1rem] text-[1.3rem] rounded-[1rem] w-[5rem] 
                        hover:cursor-pointer hover:bg-red-600 transition-all duration-300"
            >
              No💔
            </button>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-4">
            <button
              onClick={handleNextDay}
              style={{ transform: `scale(${yesSize})` }}
              className="bg-green-600 p-[0.3rem] text-[1.3rem] text-white rounded-[1rem] w-[5rem] 
                        hover:cursor-pointer hover:bg-green-700 transition-all duration-300"
            >
              Yes💗
            </button>
          </div>
        )}
        {stage === 2 && <p className="mt-[1.4rem] text-white font-light">Don't say no...🥺</p>}
        {stage === 3 && <p className="mt-[1.4rem] text-white font-light">That was a misclick right?🙁</p>}
        {stage === 4 && <p className="mt-[1.4rem] text-white font-light">This is getting sad...</p>}
        {stage === 5 && <p className="mt-[1.4rem] text-white font-light">Last chance… think carefully.. 🫣</p>}
        {stage === 6 && <p className="mt-[1.4rem] text-white font-light">There is a glitch in the site, let's just remove the button</p>}
      </div>
    </div>
  );
};

export default Day2;
