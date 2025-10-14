import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import EditProfile from "./EditProfile"
import { BASE_URL } from "../utils/constants"
import { addUser } from "../utils/userSlice"

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(BASE_URL + "/profile", {
          withCredentials: true,
        })
        dispatch(addUser(res.data)) // update redux store
      } catch (err) {
        console.error("Error fetching profile:", err)
      } finally {
        setLoading(false)
      }
    }

    // Only fetch if user not already in store (optional optimization)
    if (!user) {
      fetchUserProfile()
    } else {
      setLoading(false)
    }
  }, [dispatch, user])

  if (loading) return <p>Loading profile...</p>
  if (!user) return <p>No user found. Please login again.</p>

  return (
    <div>
      <EditProfile user={user} />
    </div>
  )
}

export default Profile
