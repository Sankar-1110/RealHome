import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md';
export default function Listingitem({listing}) {
  return (
    <div className='bg-white border hover:border-slate-400  border-solid   rounded-lg  shadow-sm  hover:shadow-2xl  transition-shadow overflow-hidden w-full  sm:h-auto sm:w-[330px]'>
        <Link to={`/listing/${listing._id}`}>
        <img className='h-[220px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' src={listing.imageUrls[0]} alt="listing-cover" />
        <div className='flex flex-col gap-2 p-3'>
            <p className='font-semibold text-lg text-slate-700'>{listing.name}</p>
            <div className='flex items-center gap-1'>
                <MdLocationOn className='h-4 w-4 text-green-700'/>
                <p className='text-sm text-gray-600 line-clamp-2 font-semibold'>{listing.address}</p>
            </div>
            <p className='text-sm font-semibold text-gray-600 line-clamp-2'>{listing.description}</p>
            <p className='font-semibold'>{listing.offer?listing.discountprice.toLocaleString('en-US'):listing.regularprice.toLocaleString('en-US')}
                {listing.type==='rent'&& '/month'}
            </p>
            <div className='flex gap-2'>
                <div  className='font-bold text-xs text-slate-700'>
                    {listing.bedrooms>1?`${listing.bedrooms}beds`:`${listing.bedrooms}bed`}
                </div>
                <div  className='font-bold text-xs text-slate-700'>
                    {listing.bathrooms>1?`${listing.bathrooms}baths`:`${listing.bathrooms}bath`}
                </div>
            </div>
        </div>
        </Link>
    </div>
  )
}
