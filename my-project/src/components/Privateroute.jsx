import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
export default function Privateroute() {
    const {currentUser}=useSelector((store)=>store.user)
  return (
   currentUser?<Outlet/>:<Navigate to='/signin'/>
  )
}
