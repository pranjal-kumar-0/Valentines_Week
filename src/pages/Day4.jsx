import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {useLocation,useNavigate} from "react-router-dom";

const Day4 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name") || "Stranger";


  const [teddies, setTeddies] = useState([]);
  const [basketX, setBasketX] = useState(150);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [step, setStep] = useState(0);
  const timerRef = useRef(null);

  const handleNextDay = () => {
        if (name.trim()){
        navigate(`/promiseday?name=${encodeURIComponent(name)}`)
        } 
    };
  useEffect(() => {
    setTimeout(() => setStep(1), 3000);
    setTimeout(() => setStep(2), 6000);
    setTimeout(() => {
      setGameStarted(true);
      startTimer();
    }, 9000);
  }, []);

  const startTimer = () => {
    timerRef.current = setTimeout(() => {
      setGameOver(true);
    }, 30000);
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const interval = setInterval(() => {
      setTeddies((prev) => [...prev, { id: Date.now(), x: Math.random() * 350, y: 0 }]);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;
    const fallInterval = setInterval(() => {
      setTeddies((prev) => prev.map((teddy) => ({ ...teddy, y: teddy.y + 5 })));
    }, 50);
    return () => clearInterval(fallInterval);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") setBasketX((prev) => Math.max(prev - 30, 0));
      if (e.key === "ArrowRight") setBasketX((prev) => Math.min(prev + 30, 350));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setTeddies((prev) => {
      let newScore = 0;
      const updatedTeddies = prev.filter((teddy) => {
        if (teddy.y >= 450 && teddy.x >= basketX && teddy.x <= basketX + 100) {
          newScore++;
          return false;
        }
        return teddy.y < 500;
      });
      
      if (newScore > 0) {
        setScore((s) => s + newScore);
      }
  
      return updatedTeddies;
    });
  }, [basketX]);
  

  return (
    <div className="flex flex-col items-center h-screen">
      {!gameStarted && !gameOver && (
        <>
            <div className="flex flex-col items-center justify-center h-full">
                <motion.p className="text-pink-500 font-bold text-3xl" animate={{ opacity: step >= 0 ? 1 : 0 }}>Happy TEDDY DAY!!</motion.p>
                {step >= 1 && <motion.p className="text-pink-600 text-xl mt-2" animate={{ opacity: step >= 1 ? 1 : 0 }}>I want to give you a million teddies</motion.p>}
                {step >= 2 && <motion.p className="text-pink-700 text-lg mt-2" animate={{ opacity: step >= 2 ? 1 : 0 }}>But why not play a game? Use arrow keys to move!</motion.p>}
            </div>
        </>
      )}
      
      {gameStarted && !gameOver && (
        <>
         <div className="h-screen flex flex-col justify-center items-center ">
            <div className="relative w-[400px] h-[500px] bg-pink-50 border-4 border-black mt-4 overflow-hidden">
                {teddies.map((teddy) => (
                <motion.img
                    key={teddy.id}
                    src="./teddy.png"
                    alt="Teddy"
                    className="absolute w-10 h-10"
                    animate={{ y: 500 }}
                    transition={{ duration: 2, ease: "linear" }}
                    style={{ left: teddy.x }}
                />
                ))}
                <motion.img
                src="./basket.png"
                alt="Basket"
                className="absolute bottom-0 w-[100px] h-[50px] -mb-[0.4rem]"
                animate={{ x: basketX }}
                transition={{ type: "spring", stiffness: 300 }}
                />
            </div>
          </div>
        </>
      )}

      {gameOver && (
        <>
            <motion.p className="text-pink-600 font-bold text-[1.5rem] text-xl mt-6 " animate={{ opacity: 1 }}>
            Yayy!!! You collected <span className="text-[2rem] font-stretch-semi-expanded">{score}</span> teddies!
            </motion.p>
            <div className="flex flex-wrap justify-center gap-4 mt-4 max-w-[30rem]">
            {[...Array(score)].map((_, index) => (
            <img key={index} src="./teddy.png" alt="Teddy" className="w-20 h-20" />
            ))}
            </div>
                <motion.button
                            className="mt-[3rem] px-6 py-3 bg-pink-600 text-white font-semibold rounded-xl hover:bg-pink-700 transition-all duration-300 -mb-[15rem] max-h-[4rem]"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleNextDay}
                >
                Next Day →
                </motion.button>
 
        
      </>

      )}
    </div>
  );
};

export default Day4;
