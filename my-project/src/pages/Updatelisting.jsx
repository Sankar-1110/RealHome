import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react'
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';

export default function Update_list() {
  const[files,setFiles]=useState([]);
  const[loading,setLoading]=useState(false)
  const [error,setError]=useState("");
  const[imgloading,setimgLoading]=useState(false)

  const {currentUser}=useSelector((state)=>state.user)
  const navigate=useNavigate();
const params=useParams();
  const [formData,setFormdata]=useState({
    imageUrls:[],
    name:'',
    description:'',
    address:'',
    type:'rent',
    bedrooms:1,
    bathrooms:1,
    regularprice:50,
    discountprice:50,
    offer:false,
    parking:false,
    furnished:false
  })
  const[imgErr,setImgErr]=useState(false);


  const handleinputimg=(e)=>{
   setimgLoading(true)
     if(files.length>0 && files.length+formData.imageUrls.length<7){
      const promises=[];
      for(let i=0;i<files.length;i++){
      promises.push(storeImg(files[i]))
    }
    Promise.all(promises).then((urls)=>{
      setFormdata({
        ...formData,
        imageUrls:formData.imageUrls.concat(urls),
      })
      setImgErr(false);
      setimgLoading(false)
      
    }).catch((error)=>{
      setimgLoading(false)
      setImgErr('Image upload failed');
      setTimeout(() => {
        setImgErr(false)
      }, 3000);
    })
     }else{
      setimgLoading(false)
      setImgErr('You can only upload 6 images')
      setTimeout(() => {
        setImgErr(false)
      }, 3000);
     }
  }
  const storeImg=async(file)=>{
    return new Promise((resolve,reject)=>{
      const storage=getStorage(app);
      const fileName=new Date().getTime()+file.name;
      const storageRef=ref(storage,fileName);
      const uploadTask=uploadBytesResumable(storageRef,file);
      uploadTask.on("state_changed",
        (snapshot)=>{
           const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
           console.log(`uploaded ${progress}`)
        },
        (error)=>{
         setImgErr(true)
          reject(error);
        },
        ()=>{
         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        
          resolve(downloadURL);
          setImgErr(false)
         })
        }
      )
    })
  }
  const handleSubmit=async(e)=>{
    try{
    if(formData.imageUrls.length<1){ return setError('Choose atleast one image');
  }
    if(+formData.regularprice<+formData.discountprice){
      return setImgErr('Discount price should not exceed Regular price ');
   
    }
    e.preventDefault();
      setLoading(true)
     const response =await fetch(`/api/listing/update/${params.listingId}`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        ...formData,
        userRef:currentUser._id,
      })
     })
     const result=await response.json();
     setLoading(false)
     if(!response.ok){
      setLoading(false)
      setError(result.message);
      setTimeout(() => {
        setError(false)
      }, 3000);
     }
     if(response.ok){
      navigate(`/listing/${result._id}`)
     }
    
    }catch(error){
      setLoading(false)
      setError(error.message)
      setTimeout(() => {
        setError(false)
      }, 3000);
    }
    
  }
  const handleDeleteImg=(index)=>{
     setFormdata({
      ...formData,
      imageUrls:formData.imageUrls.filter((_,i)=>
          i!==index
      )
     })
  }

  const handlechange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormdata({
        ...formData,
        type:e.target.id , 
      });
    }
    if(e.target.id==='parking'||e.target.id==='furnished'||e.target.id==='offer')  {
      setFormdata({
        ...formData,
        [e.target.id]:e.target.checked
      })
    }
    if(e.target.id==='name'||e.target.id==='description'||e.target.id==='address'){
      setFormdata({
        ...formData,
        [e.target.id]:e.target.value
      })
    }
    if(e.target.id==='bedrooms'||e.target.id==='bathrooms'||e.target.id==='regularprice'||e.target.id==='discountprice'){
      setFormdata({
        ...formData,
        [e.target.id]:e.target.value,
      })
    }
  };
  useEffect(()=>{
    const fetchListing=async()=>{
        const listingId=params.listingId
        console.log(listingId);
        const res=await fetch(`/api/listing/get/${listingId}`);
        const data=await res.json();
        if(!res.ok){
       console.log(data.message);
       return;
        }
        setFormdata(data)
    }
   fetchListing();
  },[])
  
  return (
    <main className='overflow-x-hidden mt-28'>
  <h1 className='text-center font-semibold text-[30px]'>Update List</h1>
  <br />
  <form className='flex flex-col p-2 sm:flex-row sm:w-4xl max-w-5xl mx-auto '>
    <div className='flex flex-col gap-4  p-4 w-full sm:w-1/2'>
      <input
        onChange={handlechange}
        value={formData.name}
        className='p-3 rounded-lg shadow-md focus:outline-none hover:shadow-gray-400 border-2 focus:shadow-md '
        type='text'
        id='name'
        placeholder='Name'
      />
      <textarea
        onChange={handlechange}
        value={formData.description}
        className='p-3 rounded-lg shadow-md focus:outline-none hover:shadow-gray-400 border-2 focus:shadow-md '
        type='text'
        id='description'
        placeholder='Description'
      />
      <input
        onChange={handlechange}
        value={formData.address}
        className='p-3 rounded-lg shadow-md focus:outline-none hover:shadow-gray-400 border-2 focus:shadow-md '
        type='text'
        id='address'
        placeholder='Address'
      />
      <div className='flex flex-wrap gap-4'>
        <div className='flex gap-2'>
          <input
            checked={formData.type === 'sale'}
            onChange={handlechange}
            id='sale'
            className='w-4'
            type='checkbox'
          />
          <span>Sell</span>
        </div>
        <div className='flex gap-2'>
          <input
            checked={formData.type === 'rent'}
            onChange={handlechange}
            id='rent'
            className='w-4'
            type='checkbox'
          />
          <span>Rent</span>
        </div>
        <div className='flex gap-2'>
          <input
            checked={formData.parking}
            onChange={handlechange}
            id='parking'
            className='w-4'
            type='checkbox'
          />
          <span>Parking</span>
        </div>
        <div className='flex gap-2'>
          <input
            checked={formData.furnished}
            onChange={handlechange}
            id='furnished'
            className='w-4'
            type='checkbox'
          />
          <span>Furniture</span>
        </div>
        <div className='flex gap-2'>
          <input
            checked={formData.offer}
            onChange={handlechange}
            id='offer'
            className='w-4'
            type='checkbox'
          />
          <span>Offer</span>
        </div>
      </div>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 border-2 px-2'>
          <input
            onChange={handlechange}
            value={formData.bedrooms}
            type='number'
            className='p-3 outline-none rounded-lg'
            id='bedrooms'
            min='1'
            max='10'
          />
          <span>Beds</span>
        </div>
        <div className='flex items-center gap-2 border-2 px-2'>
          <input
            onChange={handlechange}
            value={formData.bathrooms}
            type='number'
            className='p-3 outline-none rounded-lg'
            min='1'
            id='bathrooms'
            max='10'
          />
          <span>Baths</span>
        </div>
        <div className='flex items-center gap-2 border-2 px-2'>
          <input
            onChange={handlechange}
            value={formData.regularprice}
            type='number'
            className='p-3 outline-none rounded-lg'
            min='50'
            max='100000'
            id='regularprice'
          />
          <div className='flex flex-col items-center'>
            <span>Regular price</span>
            {formData.type==='rent'?
            <span className='text-xs'>(10$ / month)</span>:null}
          </div>
        </div>
        {formData.offer?
        <div className='flex items-center gap-2'>
          <input
            onChange={handlechange}
            value={formData.discountprice}
            type='number'
            className='p-3 outline-none rounded-lg'
            min='40'
            max='10000'
            id='discountprice'
          />
          <div className='flex flex-col items-center'>
            <span>Discounted price</span>
            {formData.type==='rent'?
            <span className='text-xs'>(10$ / month)</span>:null}
          </div>
        </div>:null}
      </div>
    </div>
    <div className='flex flex-col gap-4 flex-wrap  p-4 w-full sm:w-1/2'>
      <div className='flex flex-wrap'>
        <div className='text-slate-900'>
          <p>
            <span className='font-semibold text-black'>Images:</span> The first
            will be the cover(max 6)
          </p>
        </div>
      </div>
      <div className='flex gap-4 flex-wrap '>
        <div className='p-2 border border-slate-700 rounded-lg '>
          <input
            className='rounded-sm w-full'
            onChange={(e) => {
              setFiles(e.target.files);
            }}
            type='file'
            id='images'
            accept='image/*'
            multiple
          />
        </div>
        <button
          type='button'
          onClick={handleinputimg}
          className='border border-green-600 text-green-600 px-4 rounded-lg hover:text-green-700'
        >
          {imgloading ? 'Uploading..' : 'Upload'}
        </button>
      </div>
      <div>
        {error ? (
          <p className='text-red-600 font-semibold text-center'>{error}</p>
        ) : null}
        {imgErr ? (
          <p className='text-red-600 font-semibold text-center'>
            {imgErr}
          </p>
        ) : (
          <div className='flex flex-col gap-2'>
            {formData.imageUrls.map((url,index) => (
            <div key={url} className='flex justify-between'>
              <img src={url} alt='uploaded images' className='my-1 w-16' /> 
              <button type='button' onClick={()=>handleDeleteImg(index)} className='border border-red-600 text-red-600 px-2 rounded-lg hover:text-red-700'>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
      disabled={loading||imgloading}
        onClick={handleSubmit}
        type='submit'
        className='bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-2 px-4 rounded'
      >
        {loading ? 'Loading...' : 'Update List'}
      </button>
    </div>
  </form>
</main>

  )
}
