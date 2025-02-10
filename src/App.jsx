import { useState, useRef, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage'
import Day1 from './pages/Day1';
import Day2 from './pages/Day2';
import Day3 from './pages/Day3';
import Day4 from './pages/Day4';
import Day5 from './pages/Day5';
import Day6 from './pages/Day6';
import Day7 from './pages/Day7';
import Day8 from './pages/Day8';

function App() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 1;
    
      const playAudio = () => {
        audio.play().catch(err => console.log("Autoplay blocked: ", err));
        document.removeEventListener("click", playAudio);
      };

      document.addEventListener("click", playAudio);
    }
  }, []);
  return (
    <>
      <Router>
        <audio ref={audioRef} src="./blue.mp3" loop autoPlay></audio>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/roseday" element={<Day1/>} />
          <Route path='/proposeday' element={<Day2/>}/>
          <Route path='/chocolateday' element={<Day3/>}/>
          <Route path='/teddyday' element={<Day4/>}/>
          <Route path="/promiseday" element={<Day5/>}/>
          <Route path="/hugday" element={<Day6/>}/>
          <Route path='/kissday' element={<Day7/>}/>
          <Route path='/valentineday' element={<Day8/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
