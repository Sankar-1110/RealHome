import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css/bundle';
import SwiperCore from 'swiper';
import { Navigation } from "swiper/modules";
import Listingitem from "../components/Listingitem";
import houseimg from '../image/houseimg.jpg'
export const Home=()=>{
  const [offerListings,setOfferListings]=useState([])
  const [saleListings,setSaleListings]=useState([])
  const [rentListings,setRentListings]=useState([])
  const [loadingPage,setLoadingPage]=useState(false)
  SwiperCore.use([Navigation])
  console.log(saleListings);
  useEffect(()=>{
    const fetchofferListings=async()=>{
      try{
        setLoadingPage(true)
        const res=await fetch(`/api/listing/get?offer=true&limit=4`)
        const data=await res.json()
        console.log("Offer Listings Data:", data);
        setOfferListings(data)
        fetchRentListings();
      }catch(error){
        console.log(error);
      }
    }
    const fetchRentListings=async()=> {
      try{
        const res=await fetch(`/api/listing/get?type=rent&limit=4`)
        const data=await res.json()
        setRentListings(data)
        fetchSaleListings();
      }catch(error){
        console.log(error);
      }
    }  
    const fetchSaleListings=async()=> {
      try{
        const res=await fetch(`/api/listing/get?type=sale&limit=4`)
        const data=await res.json()
        setSaleListings(data)
        setLoadingPage(false);
      }catch(error){
        console.log(error);
      }
    }   
    
    fetchofferListings();
  },[])

    return(

        <div className="mt-20 relative">
         {/* top */}
         <div className=" h-[350px] sm:h-[500px]  md:h-[600px]  mx-auto ">
         <div  className=" flex flex-col  gap-6 p-28 px-3 max-w-6xl mx-auto z-10 relative top-0   sm:top-24 ">
          <h1 className="text-white font-bold text-3xl md:text-5xl lg:text-6xl">Find your next <span className="text-white">perfect</span>
          <br/>place with ease</h1>
          <div className="text-white text-xs font-semibold sm:text-base">
            RealHome is the best place to find your next perfect place to live
            <br/>
            <Link className="text-base sm:text-base text-blue-500 font-bold hover:underline" to={`/search`}>
            Let's get started
            </Link>
          </div>
         </div>
         <div  className=" w-full absolute top-0 ">
            <img className="h-[350px] sm:h-[500px] md:h-[600px]  w-full  "src={houseimg} alt="homeimg" />
            <div className="absolute inset-0 bg-black bg-opacity-70 "></div> 
         </div>
         </div>
         

         {/* swiper */}
         {/* <Swiper navigation >
         {
          offerListings&& offerListings.length>0&&offerListings.map((listing)=>(
     <SwiperSlide key={listing._id}>
      <div  style={{background:`url(${listing.imageUrls[0]}) center no-repeat`,backgroundSize:'cover'}} className=" h-[300px] sm:h-[700px] "></div>
     </SwiperSlide>
          ))
         }
         </Swiper> */}
         {/* listing results for offer,sale and rent */}
<div className="max-w-full mx-auto p-3 flex flex-col gap-8 my-10">
{offerListings&& offerListings.length>0&&(
  <div>
    <div className="my-3">
      <h2 className="text-2xl font-semibold text-slate-600">Recent offers</h2>
      <Link className="text-sm text-blue-800m hover:underline" to={'/search?offer=true'}>
      Show more offers</Link>
    </div>
    <div className="flex flex-wrap my-3 gap-4">
      {
        offerListings.map((listing)=>(
          <Listingitem listing={listing} key={listing._id}/>
        ))
      }
    </div>
  </div>
)}
</div>
<Swiper navigation >
         {
          offerListings&& offerListings.length>0&&offerListings.map((listing)=>(
     <SwiperSlide key={listing._id}>
      <div  style={{background:`url(${listing.imageUrls[0]}) center no-repeat`,backgroundSize:'cover'}} className=" h-[300px] sm:h-[650px] "></div>
     </SwiperSlide>
          ))
         }
         </Swiper>
<div className="max-w-full mx-auto p-3 flex flex-col gap-8 my-10">
{rentListings&& rentListings.length>0&&(
  <div>
    <div className="my-3">
      <h2 className="text-2xl font-semibold text-slate-600">Recent places for rent</h2>
      <Link className="text-sm text-blue-800m hover:underline" to={'/search?type=rent'}>
      Show more places for rent</Link>
    </div>
    <div className="flex flex-wrap my-3 gap-4">
      {
        rentListings.map((listing)=>(
          <Listingitem listing={listing} key={listing._id}/>
        ))
      }
    </div>
  </div>
)}
{saleListings&& saleListings.length>0&&(
  <div>
    <div className="my-3">
      <h2 className="text-2xl font-semibold text-slate-600">Recent places for sale</h2>
      <Link className="text-sm text-blue-800m hover:underline" to={'/search?type=sale'}>
      Show more places for sale</Link>
    </div>
    <div className="flex flex-wrap my-3 gap-4">
      {
        saleListings.map((listing)=>(
          <Listingitem listing={listing} key={listing._id}/>
        ))
      }
    </div>
  </div>
)}
</div>

        </div>
    )
}