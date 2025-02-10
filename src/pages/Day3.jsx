import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti"; 
import { motion } from "framer-motion";
import {useLocation,useNavigate} from "react-router-dom";

const Day3 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name") || "Stranger";

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [text, setText] = useState(`${name} take this chocolate <3`);
  const [showHint, setShowHint] = useState(false);
  const [isCaught, setIsCaught] = useState(false);
  const [nextDay, setNextDay] = useState(false);
  const chocolateRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  const handleNextDay = () => {
    if (name.trim()){
      navigate(`/teddyday?name=${encodeURIComponent(name)}`)
    } 
  };
  
  const handleMouseOver = () => {
    if (!hasTriggeredRef.current && !isCaught) {
      hasTriggeredRef.current = true;
      setTimeout(() => {
        setText("hehe");
      }, 3000);

      setTimeout(() => {
        setShowHint(true);
      }, 5000);
    }
  };

  const handleDoubleClick = () => {
    setText("Awww you got it!");
    setIsCaught(true);
    setShowHint(false);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setNextDay(true);
  };

  useEffect(() => {
    if (isCaught) return; 

    const handleMouseMove = (event) => {
      if (chocolateRef.current) {
        const chocolate = chocolateRef.current.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const chocoX = chocolate.left + chocolate.width / 2;
        const chocoY = chocolate.top + chocolate.height / 2;

        const distance = Math.hypot(mouseX - chocoX, mouseY - chocoY);

        if (distance < 100) {
          let newX = position.x + (chocoX - mouseX) * 0.2;
          let newY = position.y + (chocoY - mouseY) * 0.2;

          const maxX = window.innerWidth / 2 - 150;
          const maxY = window.innerHeight / 2 - 150;

          newX = Math.max(-maxX, Math.min(maxX, newX));
          newY = Math.max(-maxY, Math.min(maxY, newY));

          setPosition({ x: newX, y: newY });
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [position, isCaught]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center bg-pink-500 min-w-[30rem] p-12 rounded-[2rem]">
        <p className="text-white font-bold text-[2rem]">Chocolate Day</p>
        <p className="font-semibold text-gray-100 text-[1.5rem] mt-[1rem]">
          <span className="text-amber-300">{text}</span>
        </p>
        {showHint && (
          <p className="font-semibold text-gray-100 text-[1.2rem] mt-2">
            (double click to get the chocolate)
          </p>
        )}
        {nextDay && (
          <motion.button
            className="mt-[3rem] px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all duration-300 -mb-[15rem]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNextDay}
          >
            Next Day →
          </motion.button>
        )}
        <button
          onDoubleClick={handleDoubleClick}
          onMouseOver={handleMouseOver}
          ref={chocolateRef}
          className="hover:cursor-pointer"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: "transform 0.1s ease-out",
            position: "relative",
          }}
        >
          <img className="max-h-[15rem]" src="./chocolate.png" alt="Chocolate" />
        </button>
      </div>
    </div>
  );
};

export default Day3;
