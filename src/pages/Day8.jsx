import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

const Day8 = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name") || "Stranger";

  const choices = ["Rock", "Paper", "Scissors"];
  const counterChoices = { Rock: "Paper", Paper: "Scissors", Scissors: "Rock" }; // Ensures computer always wins
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [tries, setTries] = useState(3);
  const [message, setMessage] = useState("Choose wisely...");
  const [showButton, setShowButton] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  const handleChoice = (choice) => {
    if (tries > 0) {
      const compChoice = counterChoices[choice]; // Always picks the winning move
      setUserChoice(choice);
      setComputerChoice(compChoice);
      setTries(tries - 1);
      setMessage(tries - 1 > 0 
        ? "Guess we are going on a date... wanna try again? 😏"
        : "Looks like you are out of tries! See you on our date! ❤️");

      if (tries - 1 === 0) {
        setTimeout(() => setShowButton(true), 2000);
      }
    }
  };

  const secureDate = () => {
    setShowHeart(true);
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {!showHeart ? (
        <>
          <p className='text-[5rem] text-red-600 font-black'>VALENTINE'S DAY</p>
          <p className='text-[2rem] text-red-500 font-mono'>If you lose, you win a date with me!😉</p>
          <div className='flex flex-row mt-[2rem]'>
            <div className='mr-[2rem] bg-pink-500 p-[1rem] text-[1.3rem] text-white font-medium rounded-[1rem] min-w-[20rem] flex flex-col items-center min-h-[20rem]'>
              <p>{name.toUpperCase()}'S CHOICE</p>
              {userChoice && <img className='w-[13rem] mt-[1rem]' src={`./rps/${userChoice.toLowerCase()}.png`} alt={userChoice} />}
            </div>
            <div className='ml-[2rem] bg-pink-500 p-[1rem] text-[1.3rem] text-white font-medium rounded-[1rem] min-w-[20rem] flex flex-col items-center min-h-[20rem]'>
              <p>MY CHOICE</p>
              {computerChoice && <img className='w-[13rem] mt-[1rem]' src={`./rps/${computerChoice.toLowerCase()}.png`} alt={computerChoice} />}
            </div>
          </div>
          <div className='min-w-[20rem] bg-pink-500 min-h-[8rem] mt-[2rem] rounded-[2rem] flex flex-col items-center p-[1rem]'>
            <p className='text-white font-medium'>{message}</p>
            <div className='flex space-x-[4rem] mt-[1rem]'>
              {choices.map((choice) => (
                <button key={choice} onClick={() => handleChoice(choice)} disabled={tries === 0} className='hover:cursor-pointer'>
                  <img className='w-[6rem]' src={`./rps/${choice.toLowerCase()}.png`} alt={choice} />
                </button>
              ))}
            </div>
          </div>
          {showButton && (
            <button onClick={secureDate} className='mt-[2rem] bg-red-600 text-white p-[1rem] rounded-[1rem] text-[1.5rem] hover:cursor-pointer hover:bg-red-700'>
              Secure Date ❤️
            </button>
          )}
        </>
      ) : (
        <>
        <div className='flex flex-col items-center justify-center h-screen mt-[2rem]'>
          <div 
            style={{
              width: "150px",
              height: "150px",
              backgroundColor: "red",
              position: "relative",
              transform: "rotate(-45deg)",
              animation: "beat 1s infinite alternate ease-in-out",
            }}
          >
            <div 
              style={{
                content: '""',
                width: "150px",
                height: "150px",
                backgroundColor: "red",
                borderRadius: "50%",
                position: "absolute",
                top: "-75px",
                left: "0",
              }}
            ></div>
            <div 
              style={{
                content: '""',
                width: "150px",
                height: "150px",
                backgroundColor: "red",
                borderRadius: "50%",
                position: "absolute",
                left: "75px",
                top: "0",
              }}
            ></div>
          </div>
          <style>
            {`
              @keyframes beat {
                0% {
                  transform: scale(1) rotate(-45deg);
                }
                100% {
                  transform: scale(1.1) rotate(-45deg);
                }
              }
            `}
          </style>
        </div>
        <a href="https://github.com/pranjal-kumar-0">
          <p className='text-pink-700 font-mono text-[1.3rem] mb-[2rem]'>Made by Pranjal</p>
        </a>
        </>
      )}
    </div>
  );
};

export default Day8;
