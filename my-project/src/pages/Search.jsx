import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Listingitem from '../components/Listingitem';
export default function Search() {
    const [showMore,setShowmore]=useState(false)

    const navigate=useNavigate();
    const[loading,setLoading]=useState(false)
    const [listings,setListings]=useState([])
    const[sidebarData,setSidebardata]=useState({
        searchTerm:'',
        type:'all',
        parking:false,
        furnished:false,
         offer:false,
         sort:'create_at',
         order:'desc',
            })
            console.log(listings);
         useEffect(()=>{
      const urlParams=new URLSearchParams(location.search);
      const searchTermFromUrl=urlParams.get('searchTerm');
      const typeFromUrl=urlParams.get('type');
      const parkingFromUrl=urlParams.get('parking');
      const furnishedFromUrl=urlParams.get('furnished');
      const offerFromUrl=urlParams.get('offer');
      const sortFromUrl=urlParams.get('sort');
      const orderFromUrl=urlParams.get('order');
      if(searchTermFromUrl||typeFromUrl||parkingFromUrl||furnishedFromUrl||offerFromUrl||sortFromUrl||orderFromUrl){
        setSidebardata({searchTerm:searchTermFromUrl||"",
            type:typeFromUrl||'all',
            parking:parkingFromUrl==='true'?true:false,
            furnished:furnishedFromUrl==='true'?true:false,
            offer:offerFromUrl==='true'?true:false,
            sort:sortFromUrl||'created_at',
            order:orderFromUrl||'desc',
        })
    }
  const fetchListings=async()=>{
   setLoading(true)
   const searchQuery=urlParams.toString();
   const res=await fetch(`/api/listing/get?${searchQuery}`)
   const data=await res.json()
   if(data.length>8){
    setShowmore(true)
   }else{
    setShowmore(false)
}
setListings(data)
setLoading(false)
  }
  fetchListings();
},[location.search])
 const handleChange=(e)=>{
                if(e.target.id==='all' || e.target.id==='rent'||e.target.id==='sale'){
                    setSidebardata({...sidebarData,type:e.target.id})
                }
                if(e.target.id==='searchTerm'){
                    setSidebardata({...sidebarData,searchTerm:e.target.value})
                }
                if(e.target.id==='parking'||e.target.id==='furnished'||e.target.id==='parking'||e.target.id==='offer'){
                    setSidebardata({...sidebarData,[e.target.id]:e.target.checked||e.target.checked==='true'?true:false,})
                }
                if(e.target.id==='sort_order'){
                    const sort=e.target.value.split('_')[0]||'created_at';
                    const order=e.target.value.split('_')[1]||'desc';
                    setSidebardata
                    ({...sidebarData,sort,order});

                }

            }
            const handleSubmit=(e)=>{
          e.preventDefault();
          const urlParams=new URLSearchParams()
          urlParams.set('searchTerm',sidebarData.searchTerm)
          urlParams.set('type',sidebarData.type)
          urlParams.set('parking',sidebarData.parking)
          urlParams.set('furnished',sidebarData.furnished)
          urlParams.set('offer',sidebarData.offer)
          urlParams.set('sort',sidebarData.sort)
          urlParams.set('order',sidebarData.order)
          const searchQuery=urlParams.toString();
     navigate(`/search?${searchQuery}`)
 }
 const onShowmoreClick = async () => {
    const numberOflistings = listings.length;
    const startIndex = numberOflistings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    try {
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        if (data.length < 9) {
            setShowmore(false);
        }
        setListings([...listings, ...data]);
    } catch (error) {
        console.error('Error fetching more listings:', error);
    }
};
  return (
    <div className='flex flex-col md:flex-row'>
         <div className='p-7 w-full sm:min-w-96  border-b-2 md:border-r-2  md:min-h-screen'>
        <form onSubmit={handleSubmit} action="" className='flex w-full flex-col gap-8' >
            <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                <input
                type='text'
                id='searchTerm'
                placeholder='Search..'
                className='
                border rounded-lg p-3 w-full'
                value={sidebarData.searchTerm}
                onChange={handleChange}
                />
            </div>
            <div className='flex gap-2 flex-wrap items-center'>
                <label className='font-semibold'>Type:</label>
            <div  className='flex gap-2'>
            <input type="checkbox" id='all'onChange={handleChange} checked='all'className='w-5' />
                
                <span>Rent & Sale</span>
            </div>
            <div  className='flex gap-2'>
                <input type="checkbox" id='rent'className='w-5' onChange={handleChange} checked={sidebarData.type==='rent'}/>
                <span>Rent</span>
            </div>
            <div  className='flex gap-2'>
                <input type="checkbox" id='sale'className='w-5'onChange={handleChange} checked={sidebarData.type==='sale'} />
                <span> Sale</span>
            </div>
            <div  className='flex gap-2'>
                <input type="checkbox" id='offer'className='w-5' onChange={handleChange} checked={sidebarData.offer}/>
                <span>Offer</span>
            </div>
        </div>
        <div className='flex gap-2 flex-wrap items-center'>
                <label className='font-semibold' >Amenities:</label>
            <div  className='flex gap-2'>
                <input type="checkbox" id='parking'className='w-5' onChange={handleChange} checked={sidebarData.parking}/>
                <span>Parking</span>
            </div>
            <div  className='flex gap-2'>
                <input type="checkbox" id='furnished'className='w-5'onChange={handleChange} checked={sidebarData.furnished} />
                <span>Furnished</span>
            </div>
            
        </div>
        <div><label className='font-semibold'>Sort:</label>
        <select onChange={handleChange}defaultValue={'created_at_desc'} name="" id="sort_order">
            <option  value="regularprice_desc">Price high to low</option>
            <option  value="regularprice_asc">Price low to high</option>
            <option  value="createdAt_desc">Latest</option>
            <option  value="createdAt_asc">Oldest</option>
            </select></div>
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
        </form>
        </div>
        <div>
        <h1 className='text-3xl font-semibold px-3 '>Listing element</h1>
        <div className='flex flex-wrap gap-3 p-4'>
            {!loading&& listings.length===0&&
            <p className='text-xl text-slate-700'>No listings found!</p>
            }
            {loading&& (
                <p className='text-xl text-slate-700 w-full'>Loading...</p>
            )

            }
            {!loading&& listings&&listings.map((listing)=>(
                <Listingitem key={listing._id} listing={listing}/>
            ))}
       {showMore&&(
        <button type='
        button' className='text-green-800 font-semibold text-center w-full  hover:text-green-700 hover:underline underline-offset-2' onClick={onShowmoreClick}>Show more</button>
       )}
            
            
        </div>
        </div>
    </div>
  )
}