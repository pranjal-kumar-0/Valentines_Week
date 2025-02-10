import React, { useState } from "react";
import {useLocation,useNavigate} from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Day5 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name") || "Stranger";  

    const promises = [
        "I promise to always support you.",
        "I promise to be there in tough times.",
        "I promise to listen to you patiently.",
        "I promise to never break your trust.",
        "I promise to always laugh at you."
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [nextDay, setNextDay] = useState(false);

    const handleNextDay = () => {
        if (name.trim()){
        navigate(`/hugday?name=${encodeURIComponent(name)}`)
        } 
    }
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % promises.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + promises.length) % promises.length);
    };

    const handleSubmit = () => {
        if (acceptedTerms) {
        setSubmitted(true);
        startPetals();
        setTimeout(() => setNextDay(true), 3500);
        }
    };
    

    const startPetals = () => {
        for (let i = 0; i < 50; i++) {
        createPetal();
        }
    };

    const createPetal = () => {
        const petal = document.createElement("div");
        petal.classList.add("petal");
        document.body.appendChild(petal);

        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${Math.random() * 5 + 3}s`;

        setTimeout(() => {
        petal.remove();
        }, 8000);
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col justify-center items-center bg-pink-500 min-w-[30rem] p-12 rounded-[2rem] relative">
            <p className="text-white font-bold text-[2rem]">Promise Day</p>
            <p className="font-semibold text-gray-100 text-[1.3rem] mt-[1rem] mb-[0.5rem]">
            Sign the promise
            </p>

            <div className="bg-pink-300 p-6 rounded-lg shadow-lg w-[20rem] text-center mt-4 relative">
            <p className="text-gray-800 text-[1.2rem] font-medium">{promises[currentIndex]}</p>

            <button 
                onClick={handlePrev} 
                className="absolute left-[-2.5rem] top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
                <FaArrowLeft className="text-pink-500 text-[1.3rem]" />
            </button>

            <button 
                onClick={handleNext} 
                className="absolute right-[-2.5rem] top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
                <FaArrowRight className="text-pink-500 text-[1.3rem]" />
            </button>
            </div>

            <div className="flex items-center mt-6">
            <input
                type="checkbox"
                id="terms"
                className="mr-2"
                onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <label htmlFor="terms" className="text-gray-100 text-sm">Terms and Conditions apply{" <3"}
            </label>
            </div>

            <button
            onClick={handleSubmit}
            className="bg-white text-pink-500 px-6 py-2 mt-4 rounded-lg shadow-md font-bold text-lg hover:bg-gray-100"
            >
            Submit
            </button>
        </div>
        { nextDay && (
        <motion.button
                                    className="mt-[3rem] px-6 py-3 bg-pink-600 text-white font-semibold rounded-xl hover:bg-pink-700 transition-all duration-300 max-h-[4rem]"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleNextDay}
                        >
                        Next Day →
                        </motion.button>
        )
    }
        

        <style>
            {`
            .petal {
                position: fixed;
                top: -10px;
                width: 15px;
                height: 15px;
                background-color: pink;
                border-radius: 50%;
                opacity: 0.8;
                animation: fall linear infinite;
            }

            @keyframes fall {
                0% {
                transform: translateY(0) rotate(0);
                }
                100% {
                transform: translateY(100vh) rotate(720deg);
                }
            }
            `}
        </style>
        
        </div>
        
    );
    };

export default Day5;