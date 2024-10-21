import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { useRef } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { UpdateprofileStart,UpdateprofileFail,UpdateprofileSuccess,
  deleteUserStart,deleteUserSuccess,deleteUserFail,
  signoutUserFail,
  signoutUserStart,
  signoutUserSuccess,clearError
 } from '../redux/user/userSlice';
 
import  {useDispatch} from'react-redux'
export const Profile=()=> {
const [filePer,setFileper]=useState(0);
const[listings,setListings]=useState([]);
const [fileUploadErr,setFiUplErr]=useState(false);
  const fileRef=useRef(null)
  const dispatch=useDispatch();
  const[formData,setFormdata]=useState({})
  const[updateSucc,setUpdateSucc]=useState(false)
  const[listingErr,setListingErr]=useState('');
  const {currentUser,loading}=useSelector((state)=>state.user)
  const[file,setFile]=useState(undefined)
  const [Totlistings,setTotlistings]=useState('');
const navigate=useNavigate();
  console.log(formData);
  useEffect(()=>{
      if(file){
        handleFileUpload(file)
      }
  },[file])
  useEffect(() => {
    // Clear the error state when the component mounts
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);
  const handleFileUpload=()=>{
    const storage=getStorage(app);
    const filename=new Date().getTime()+file.name
    const storageRef=ref(storage,filename)
    const uploadTask=uploadBytesResumable(storageRef,file)
    uploadTask.on('state_changed',
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
       console.log(`uploaded ${progress}%`); 
       setFileper(Math.round(progress));
      },
      (error)=>{
        setFiUplErr(true)
        setTimeout(()=>{
            setFiUplErr(false)
        },3000)
      },
      ()=>{
           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            setFormdata({...formData,avatar:downloadURL})
           })
      }
      
    )
  }
  
  const handleChange=(e)=>{
    setFormdata({...formData,[e.target.id]:e.target.value})
    
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
   dispatch(UpdateprofileStart())

   const res=await fetch(`/api/user/update/${currentUser._id}`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(formData)
   })
   const data=await res.json();
   if(!res.ok){
    dispatch(UpdateprofileFail(data.message))
    return;
   }
   setUpdateSucc(true)
   setTimeout(() => {
    setUpdateSucc(false)
   }, 3000);
   dispatch(UpdateprofileSuccess(data))
    }catch(error){
      dispatch(UpdateprofileFail(error.message))
    }
  }
  const handleDeleteUser=async()=>{
    try{
dispatch(deleteUserStart())
const res=await fetch(  `/api/user/delete/${currentUser._id}`,{
  method:'DELETE'
})
const data=await res.json();
if(!res.ok){
  dispatch(deleteUserFail(data.message))
  return;
}
dispatch(deleteUserSuccess(data))

    }catch(error){
dispatch(deleteUserFail(error.message))
    }
  }
  const handleSignOut=async()=>{
    try{
   dispatch(signoutUserStart())
     const res=await fetch('/api/auth/signout')
     const data=await res.json();
     if(!res.ok){
dispatch(signoutUserFail(data.message))
return;
     }
     dispatch(signoutUserSuccess(data))
    }catch(error){
dispatch(signoutUserFail(error.message))    }
  }
  const GetListings=async()=>{
     try{
        const res=await fetch(`/api/user/listing/${currentUser._id}`)
        const data=await res.json();
        if(!res.ok){
          setListingErr(data.message)
          return;
        }
        if(data.length===0){
setTotlistings('No Listings found!')
        }
        setListings(data)
     }catch(error){
     setListingErr(error)
     }
  }
  const handleDeleteListing=async(listingId)=>{
    try{
  const res=await fetch(`/api/listing/delete/${listingId}`,{
method:'DELETE'
  })

  const data=await res.json();
  if(!res.ok){
    console.log(data.message);
    return;
  }
  setListings((prev)=>prev.filter((listing)=>listing._id!==listingId));

    }catch(error){
      console.log(error.message);
    }
  }
  return (
    <div className='max-w-md my-20  mx-auto p-5 rounded-xl bg-white shadow-2xl shadow-blue-400'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4'>
        <input type="file" hidden accept='
        images/*' ref={fileRef} onChange={(e)=>setFile(e.target.files[0])} name="" id="" />
        <img src={formData.avatar|| currentUser.avatar} onClick={(e)=>fileRef.current.click()}alt=""className='rounded-full h-24 w-24 object-cover curser-pointer self-center' />
        {fileUploadErr?<span className='text-red-700 font-semibold  text-center'>Upload failed!</span>:filePer>0 && filePer<100 ?(
          <span className='text-green-700 font-semibold  text-center'>{`Uploaded ${filePer}%`}</span>
        ):filePer===100?<span className='text-green-700 font-semibold  text-center'>Click update button!</span>:null}
        <input id='username' type="text " placeholder='username'className=' p-3 rounded-lg shadow-md focus:outline-none focus:shadow-blue-400 'defaultValue={currentUser.username} onChange={handleChange}/>
        <input id='email' type="text " placeholder='email'onChange={handleChange}
        className=' p-3 rounded-lg shadow-md focus:outline-none hover:shadow-blue-400 'defaultValue={currentUser.email} />
        <input id='password' type="password" placeholder='password (you can update your password)'onChange={handleChange}
        className=' p-3 rounded-lg shadow-md focus:outline-none shadow-blue-400 'defaultValue={currentUser.password} />
        <button type='submit' className=' bg-gradient-to-r from-green-400 to-green-700 text-white font-bold py-2 px-4 rounded text-center 'onClick={handleSubmit}>{loading?'Loading...':'Update'}</button>
        <Link className=' bg-gradient-to-r from-blue-400 to-blue-700 text-white font-bold py-2 px-4 rounded text-center ' to={'/create-list'}>
        <button type='button' >{loading?'Loading...':'Create List'}</button></Link>
      </form>
      <div className='mx-auto flex justify-between text-red-700 my-2'>
      <p className='hover:text-red-600 cursor-pointer  font-semibold'onClick={handleDeleteUser}>Delete account</p>
      <p className='hover:text-red-600 cursor-pointer font-semibold'onClick={handleSignOut}>Signout</p>
      </div>
     {/* {error?<p className='my-3 text-red-700 font-semibold text-center'>{error}</p>:null} */}
     {updateSucc?<p className='my-3 text-green-700 font-semibold text-center'>Updated successfully!</p>:null}
      
      <p onClick={GetListings} className='text-center font-semibold text-green-700 hover:text-green-600'>Show Listings</p>

      <div className='w-lg max-auto my-3 flex flex-wrap flex-col gap-2'>
        {listingErr?<p className='text-center text-red-700 font-semibold'>{listingErr}</p>:
        (listings.length>0 &&
          listings.map((listing)=>(
            <div key={listing._id} className='flex w-full justify-between bg-slate-200 border border-slate-400 p-2 rounded-lg '>
              <div className='gap-2 flex items-center flex-wrap'>
             <img src={listing.imageUrls[0]} alt=""className='w-24 h-16' />
             <p className='truncate font-semibold text-slate-600 '>{listing.name}</p>
             </div>
             <div className='flex flex-col items-center'>
              <p onClick={()=>handleDeleteListing(listing._id)} className='text-red-700 font-semibold   hover:text-red-600 cursor-pointer'>Delete</p>
             <Link to={`/update-list/${listing._id}`}><p  className='text-green-700 font-semibold hover:text-green-600 cursor-pointer'>Edit</p></Link> 

             </div>
            </div>
          ))
        )}
        {
          Totlistings?<p className='my-1 text-red-700 font-semibold text-center'>{Totlistings}</p>:null
        }
       
        
      </div>
    </div>
  )
}
