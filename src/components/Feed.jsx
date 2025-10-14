import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import axios from 'axios'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector(store => store.feed)
  const dispatch = useDispatch()
  const getFeed = async () => {
    if (feed) return
    try {
      const res = await axios.get(BASE_URL + "/user/feed",{withCredentials:true})
      dispatch(addFeed(res.data))
      console.log(res);
      
    } catch (error) {
      console.log(error.message);

    }
  }
  useEffect(()=>{
    getFeed()
  },[])
  return (
    <div className='flex flex-col items-center my-10 min-h-[80vh]'>
      {!feed ? (
        <p className="text-gray-500">Loading feed...</p>
      ) : feed.data?.length === 0 ? (
        <p className="text-gray-600 text-lg">No more users to display 👀</p>
      ) : (
        <UserCard user={feed.data[0]} type="feed" />
      )}
    </div>
  )
}

export default Feed