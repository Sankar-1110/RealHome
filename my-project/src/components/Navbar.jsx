import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import { FaBars,FaTimes } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa'

import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import logoimg from "../image/logoimg.jpg"

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
  console.log(currentUser);
  
  return (
    <header className='w-lvw   fixed top-0 z-20  '>
        <div className=' w-full   bg-gradient-to-r from-blue-500 to-blue-900  flex items-center px-2 py-[2px] justify-evenly '>

          <Link to={'/'}>

        <div className='font-bold font-md flex text-sm sm:text-xl border-2 border-slate-500 rounded-full p-1 sm:px-3 sm:py-1 gap-4 bg-white'>
        <img src={logoimg} alt="" className='w-9 h-8 rounded-full'/>

         <div className='hidden md:flex'>
        <span className='text-[#3d6797] text-lg'>Real</span>
        <span className='text-[#696f74] text-lg'>Home</span>
        </div>
        </div>
        </Link>
        <form  onSubmit={handleSubmit}action="" className='px-2 py-[6px] sm:w-1/2 md:w-1/3  flex items-center justify-between bg-white rounded-full ml-4 border-2 border-slate-500'>
          <FaMapMarkerAlt  className='text-gray-500'/>
            <input onChange={(e)=>setSearchTerm(e.target.value)} value={searchTerm} type="text"placeholder='Search' className='focus:outline-none bg-transparent w-full text-[#002147] px-2'  />
            <button >
            <FaSearch className='text-[#002147]' /></button>
        </form>
        <ul className=' hidden w-[300px] items-center sm:flex justify-between text-lg text-white font-bold  p-2 '>
        <Link to="/"> <li className='   p-2 rounded-xl hover:text-xl transition duration-500  '>Home</li></Link>
        <Link to="/Search">
  <li className='  hover:text-xl  p-2 rounded-xl   transition duration-500 '>
    Houses
  </li>
</Link>
        <Link to="/about">
  <li className='  hover:text-xl  p-2 rounded-xl   transition duration-500 '>
    About
  </li>
</Link>

        <Link to="/profile">{currentUser?<img src={currentUser.avatar} className='h-8 rounded-full border-4  border-white '/>:
        <li className='  p-2 rounded-xl  hover:text-xl transition duration-500 '>SignIn</li>}
        </Link>
        </ul>
        <button onClick={()=>setSideBar(!sideBar)} className='sm:hidden mx-3'>{sideBar?<FaTimes className='text-white text-lg'/>:<FaBars className='text-white text-lg'/>}</button>
        </div>
      
      <div className={`sm:hidden relative z-10 bg-white w-full  ${sideBar?'visible':'hidden'}`}>
      <ul className={` w-full flex flex-col   justify-center items-center  gap-8  p-2 font-semibold relative z-0`}>
      <Link to="/"> <li onClick={()=>setSideBar(!sideBar)} className=' hover:text-2xl font-semibold text-xl text-[#164b8b]  p-2  '>Home</li></Link>
      <Link to="/Search"> <li onClick={()=>setSideBar(!sideBar)} className=' hover:text-2xl font-semibold text-xl text-[#164b8b]  p-2 '>Houses</li></Link>
      <Link to="/about"> <li onClick={()=>setSideBar(!sideBar)} className=' hover:text-2xl font-semibold text-xl text-[#164b8b]  p-2 '>About</li></Link>
      <Link to="/profile">{currentUser?<img onClick={()=>setSideBar(!sideBar)} src={currentUser.avatar} className='h-8 rounded-full '/>:
      <li onClick={()=>setSideBar(!sideBar)} className=' hover:text-2xl font-semibold text-xl text-[#164b8b]  p-2'>SignIn</li>}
      </Link>
      </ul>
      </div>
    </header>
  )
}
