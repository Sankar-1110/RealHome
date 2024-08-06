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
    <header className='w-lvw   fixed top-0 z-20  '>
        <div className=' w-full bg-opacity-30 bg-[#064381] backdrop-blur-md flex items-center p-2 justify-evenly  '>
          <Link to={'/'}>
        <h1 className='font-bold font-md flex text-sm sm:text-xl bg-white rounded-lg p-2'>
        <span className='text-[#3d6797] text-lg'>Real</span>
        <span className='text-[#696f74] text-lg'>Home</span>
        </h1>
        </Link>
        <form  onSubmit={handleSubmit}action="" className='p-2 w-[200px] sm:w-80 flex items-center justify-between bg-white rounded-xl ml-4'>
            <input onChange={(e)=>setSearchTerm(e.target.value)} value={searchTerm} type="text"placeholder='Search' className='focus:outline-none bg-transparent w-full text-[#002147]'  />
            <button >
            <FaSearch className='text-[#002147]' /></button>
        </form>
        <ul className=' hidden w-[300px] items-center sm:flex justify-between text-md text-[#2769b9]   p-2 font-semibold '>
        <Link to="/"> <li className=' hover:bg-[#4b7cb4] hover:text-white bg-white p-2 rounded-2xl transition duration-500 hover:font- '>Home</li></Link>
        <Link to="/about">
  <li className=' hover:bg-[#4b7cb4] bg-white p-2 rounded-2xl transition duration-500 hover:text-white'>
    About
  </li>
</Link>

        <Link to="/profile">{currentUser?<img src={currentUser.avatar} className='h-8 rounded-full'/>:
        <li className=' hover:bg-[#4b7cb4] hover:text-white transition duration-500 bg-white p-2 rounded-2xl'>SignIn</li>}
        </Link>
        </ul>
        <button onClick={()=>setSideBar(!sideBar)} className='sm:hidden mx-3'>{sideBar?<FaTimes className='text-[#164b8b] text-lg'/>:<FaBars className='text-[#164b8b] text-lg'/>}</button>
        </div>
      
      <div className={`sm:hidden relative  bg-opacity-70 z-10 backdrop-blur-md bg-transparent w-full  ${sideBar?'visible':'hidden'}`}>
      <ul className={` w-full flex flex-col   justify-center items-center  gap-8  p-2 font-semibold relative z-0`}>
      <Link to="/"> <li onClick={()=>setSideBar(!sideBar)} className='border-2 border-[#164b8b] bg-white text-lg text-[#164b8b]  p-2 rounded-2xl  '>Home</li></Link>
      <Link to="/about"> <li onClick={()=>setSideBar(!sideBar)} className='border-2 border-[#164b8b] bg-white text-lg text-[#164b8b]  p-2 rounded-2xl '>About</li></Link>
      <Link to="/profile">{currentUser?<img onClick={()=>setSideBar(!sideBar)} src={currentUser.avatar} className='h-8 rounded-full '/>:
      <li className='border-2 border-[#164b8b] text-[#164b8b]  text-lg bg-white p-2 rounded-2xl'>SignIn</li>}
      </Link>
      </ul>
      </div>
    </header>
  )
}
