import React from 'react'
import {GoogleAuthProvider,getAuth,signInWithPopup} from 'firebase/auth';
import {app} from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
import googleicon from '../image/googleicon.png'
export default function Auth() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleGoogleAuth=async()=>{
    
  try{

      const provider= new GoogleAuthProvider();
      const auth=getAuth(app);
      const result = await signInWithPopup(auth,provider);
      const response=await fetch('/api/auth/google',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          name:result.user.displayName,
          email:result.user.email,
          photo:result.user.photoURL
        })
      })
      if (!response.ok) {
        throw new Error('Failed to authenticate with the server');
      }
      const data=await response.json();
      if(response.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
  }
  catch(error){
    console.log('could not sign in',error);
  }
  }
  
  
  return (
    <button onClick={handleGoogleAuth} type='button' className='text-white rounded-lg  flex items-center justify-center border-2 border-gray-300 '> <img className='w-10 h-10'src={googleicon} alt="" />  </button>
  )
}
