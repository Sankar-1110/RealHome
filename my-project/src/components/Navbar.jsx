import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { FaBars,FaTimes } from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function Navbar() {
  const {currentUser}=useSelector((store)=>store.user)
  const[searchTerm,setSearchTerm]=useState('');
  const navigate=useNavigate();
  const [sideBar,setSideBar]=useState(false);
  const handleSubmit=(e)=>{
   e.preventDefault()
  const urlParams=new URLSearchParams(window.location.search);
  urlParams.set('searchTerm',searchTerm);
  const searchQuery=urlParams.toString();
  navigate(`/search?${searchQuery}`)
  }
  useEffect(()=>{
   const urlParams=new URLSearchParams(location.search);
   const searchTermFromUrl=urlParams.get('searchTerm');
   if(searchTermFromUrl){
    setSearchTerm(searchTermFromUrl);
   }
  },[location.search])

  useEffect(() => {
    if (sideBar) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden'); // Re-enable scrolling on component unmount
    };
  }, [sideBar]);
  return (
    <header className='w-lvw  bg-[#4b7cb4] text-white  shadow-slate-400 shadow-lg mb-4'>
        <div className=' w-full  flex items-center p-4 justify-evenly  '>
          <Link to={'/'}>
        <h1 className='font-bold font-md flex text-sm sm:text-xl bg-white rounded-lg p-2'>
        <span className='text-[#3d6797] text-lg'>Real</span>
        <span className='text-[#696f74] text-lg'>Home</span>
        </h1>
        </Link>
        <form  onSubmit={handleSubmit}action="" className='p-2 w-[200px] sm:w-80 flex items-center justify-between bg-slate-300 rounded-xl ml-4'>
            <input onChange={(e)=>setSearchTerm(e.target.value)} value={searchTerm} type="text"placeholder='Search' className='focus:outline-none bg-transparent w-full text-[#002147]'  />
            <button >
            <FaSearch className='text-[#002147]' /></button>
        </form>
        <ul className=' hidden w-[300px] items-center sm:flex justify-between text-md text-[#3d6797]  p-2 font-semibold '>
        <Link to="/"> <li className='hover:underline underline-offset-4  bg-white p-2 rounded-2xl'>Home</li></Link>
        <Link to="/about"> <li className='hover:underline underline-offset-4   bg-white p-2 rounded-2xl'>About</li></Link>
        <Link to="/profile">{currentUser?<img src={currentUser.avatar} className='h-8 rounded-full'/>:
        <li className='hover:underline underline-offset-4 bg-white p-2 rounded-2xl'>SignIn</li>}
        </Link>
        </ul>
        <button onClick={()=>setSideBar(!sideBar)} className='sm:hidden mx-3'>{sideBar?<FaTimes className='text-white text-lg'/>:<FaBars className='text-white text-lg'/>}</button>
        </div>
      
      <div className={`sm:hidden relative  w-full bg-[#5fa4f1] ${sideBar?'visible':'hidden'}`}>
      <ul className={` w-full flex flex-col   justify-center items-center  gap-8  p-2 font-semibold relative z-0`}>
      <Link to="/"> <li onClick={()=>setSideBar(!sideBar)} className='hover:underline underline-offset-4 bg-white text-lg text-black p-2 rounded-2xl  '>Home</li></Link>
      <Link to="/about"> <li onClick={()=>setSideBar(!sideBar)} className='hover:underline underline-offset-4 bg-white text-lg text-black p-2 rounded-2xl '>About</li></Link>
      <Link to="/profile">{currentUser?<img onClick={()=>setSideBar(!sideBar)} src={currentUser.avatar} className='h-8 rounded-full '/>:
      <li className='hover:underline text-black text-lg underline-offset-4 bg-white p-2 rounded-2xl'>SignIn</li>}
      </Link>
      </ul>
      </div>
    </header>
  )
}
