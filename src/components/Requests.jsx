import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard'
import { useDispatch, useSelector } from 'react-redux';
import { addRequest } from '../utils/requestSlice';

const Requests = () => {
  const requests=useSelector(store=>store.requests)
  const dispatch=useDispatch()
  const fetchRequests=async()=>{
    try {
      const res=await axios.get(BASE_URL+"/user/requests/received",
        {withCredentials:true}
      )
      console.log(res.data.data);
      dispatch(addRequest(res.data.data))
      
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    fetchRequests()
  },[])

  if(!requests) return 
  if(requests.length===0) return <h1>No requests found</h1>
  return (
    <div className="px-10 my-10">
    <h1 className="text-3xl font-semibold mb-8 text-center">Requests</h1>
    {/* Responsive grid layout */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
      {requests.map((request, index) => (
        <UserCard key={index} user={request} type="request" />
      ))}
    </div>
  </div>
  )
}

export default Requests