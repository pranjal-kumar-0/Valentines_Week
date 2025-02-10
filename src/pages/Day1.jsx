import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from "framer-motion";
import {useNavigate} from "react-router-dom";

const Day1 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name") || "Stranger";

  const [stage, setStage] = useState(1);
  const [showNextDay, setShowNextDay] = useState(false);

  const handleNextDay = () => {
    if (name.trim()){
      navigate(`/proposeday?name=${encodeURIComponent(name)}`)
    }
  }

  useEffect(() => {
    if (stage === 3) {
      const timer = setTimeout(() => {
        setShowNextDay(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='flex flex-col justify-center items-center bg-pink-500 min-w-[30rem] p-12 rounded-[2rem]'>
        <p className='text-white font-bold text-[2rem]'>Rose Day</p>
        <p className='font-semibold text-gray-100 text-[1.5rem] mt-[1rem]'>
          <span className='text-yellow-200'>{name}</span> here is a <span className='text-yellow-200'>rose</span> for <span className='text-yellow-200'>you!</span>💗
        </p>

        {stage === 1 && (
          <>
            <motion.button onClick={() => setStage(2)} className='hover:cursor-pointer'
              whileHover={{ scale: 1.1 }} 
              animate={{ scale: [1, 1.05, 1], transition: { duration: 1.5, repeat: Infinity } }}>
              <img className="w-auto h-[13rem]" src="/rose.png" alt="rose" />
            </motion.button>
            <p className='mt-[1rem] font-light text-white'>Click on the rose to collect it</p>
          </>
        )}

        {stage === 2 && (
          <>
            <motion.button onClick={() => setStage(3)} className='hover:cursor-pointer'
              whileHover={{ scale: 1.1 }} 
              animate={{ scale: [1, 1.05, 1], transition: { duration: 1.5, repeat: Infinity } }}>
              <img className="w-auto h-[13rem]" src="/rose.png" alt="rose" />
            </motion.button>
            <p className='mt-[1rem] font-light text-white'>No, you deserve <span className='text-[1.3rem] font-bold text-pink-200'>one</span> more!</p>
          </>
        )}

        {stage === 3 && (
          <>
            <motion.button className='hover:cursor-pointer mt-[1rem]'
              whileHover={{ scale: 1.1 }} 
              animate={{ scale: [1, 1.05, 1], transition: { duration: 1.5, repeat: Infinity } }}>
              <img className="w-auto h-[13rem]" src="/roses.png" alt="roses" />
            </motion.button>
            <p className='mt-[1rem] font-light text-white'>
              <span className='text-[1.3rem] font-bold text-pink-200'>JUST TAKE THIS!</span>
            </p>
          </>
        )}
      </div>

      {showNextDay && (
        <motion.button
          className='mt-4 px-6 py-3 bg-pink-600 text-white font-semibold rounded-xl hover:bg-pink-700 transition-all duration-300'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNextDay}
        >
          Next Day →
        </motion.button>
      )}
    </div>
  );
}

export default Day1;
