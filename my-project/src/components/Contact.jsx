import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({listing}) {
    const[landlord,setLandlord]=useState(null);
    const[message,setMessage]=useState('')
    const onChange=(e)=>{
        setMessage(e.target.value)
    }
    useEffect(()=>{
        const fetchLandlord=async()=>{
            try{
                const res=await fetch(`/api/user/${listing.userRef}`)
                const data=await res.json();
                if(!res.ok){
                    console.log(data.message);
                }
                setLandlord(data);
                console.log(landlord);
            }catch(error){
                console.log(error);
            }
        }
        fetchLandlord();
    },[listing.userRef])
  return (
    <>
    {landlord &&(
        <div className='flex flex-col gap-2'>
           <p className='font-medium'> Contact : <span>{landlord.username}</span> for {listing.name.toLowerCase()}</p>
          <textarea name='message'
          id='message'
          rows='2'
          value={message}
          onChange={onChange}
          placeholder='Enter your messsage here..'
          className='p-3 border rounded-lg shadow-lg shadow-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2'
          >

          </textarea>
          <Link to={`mailto:${landlord.email}?subject=Rregarding ${listing.name} &body=${message}`}
          className='bg-gradient-to-r from-blue-500 to-blue-800 text-white text-center p-3 uppercase rounded-lg hover:opacity95 '>Send message
          </Link>
        </div>
       
        
    )}</>
  )
}
