import React, { useState } from 'react'
import {useNavigate} from "react-router-dom";
import "../index.css"

const Homepage = () => {

  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (name.trim()){
      navigate(`/roseday?name=${encodeURIComponent(name)}`)
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
        
        <div className='flex flex-col justify-center items-center bg-pink-500 min-w-[30rem] p-12 rounded-[2rem] '>
            <p className='text-white text-[1.6rem] font-bold font-sans '>This is just</p>
            <p className='text-white text-[1.6rem] font-bold font-serif '>for</p>
            <p className='text-white text-[1.6rem] font-bold  mb-[2.5rem]'>You👉🏻👈🏻</p>
            <div>
                <label className='text-white font-semibold'>Name:
                <input onChange={(e) => setName(e.target.value)} className='bg-pink-300 ml-[0.8rem] rounded-[1.4rem] text-pink-700 text-center'/>
                </label>
                <button onClick={handleSubmit} className='bg-pink-400 text-white font-semibold ml-[0.8rem] pr-[0.25rem] pl-[0.25rem] pb-[0.1rem] pt-[0.1rem] rounded-[3rem] hover:cursor-pointer hover:bg-pink-600'>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Homepage
