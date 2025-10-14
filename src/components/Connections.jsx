import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import UserCard from './UserCard'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
  const connections = useSelector(store => store.connection)
  const dispatch = useDispatch()
  const fetchConnections = async () => {

    try {
      const res = await axios.get(BASE_URL + "/user/connections",
        { withCredentials: true }
      )
      console.log(res.data.data)
      dispatch(addConnections(res.data.data))
    } catch (error) {

    }
  }
  useEffect(() => {
    fetchConnections()
  }, [])

  if (!connections) return
  if (connections.length === 0) return <h1>No connections found</h1>
  return (
  <div className="px-10 my-10">
    <h1 className="text-3xl font-semibold mb-8 text-center">Connections</h1>

    {/* Responsive grid layout */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
      {connections.map((connection, index) => (
        <UserCard key={index} user={connection} showActions={false} />
      ))}
    </div>
  </div>
)
}

export default Connections