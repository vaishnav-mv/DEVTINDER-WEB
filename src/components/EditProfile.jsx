import React, { useState } from 'react'
import UserCard from './UserCard'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { addUser } from '../utils/userSlice'

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [age, setAge] = useState(user.age)
    const [gender, setGender] = useState(user.gender)
    const [about, setAbout] = useState(user.about)
    const [error, setError] = useState("")
    const [success,setSuccess]=useState("")

    const dispatch=useDispatch()

    const handleUpdate = async() => {
        setError("")
        setSuccess("")
        try {
            const res=await axios.patch(BASE_URL+"/profile/edit",{
                firstName,lastName,age,gender,about
            },{withCredentials:true})
            dispatch(addUser(res?.data?.data))
            setSuccess("✅ Profile updated successfully!") 
            setTimeout(()=>setSuccess(""),3000)
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='flex justify-center'>
            <div className="flex justify-center">
                <div className="card bg-primary text-primary-content w-96">
                    <div className="card-body">
                        <h2 className="card-title justify-center">Edit Profile</h2>

                        {/* First Name */}
                        <label className="input validator">
                            <input
                                type="text"
                                placeholder="First Name"
                                required
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </label>

                        {/* Last Name */}
                        <label className="input validator">
                            <input
                                type="text"
                                placeholder="Last Name"
                                required
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </label>

                        {/* Age */}
                        <label className="input validator">
                            <input
                                type="number"
                                placeholder="Age"
                                min="0"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </label>

                        {/* Gender */}
                        <label className="input validator">
                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                className="w-full bg-transparent"
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>
                        </label>

                        {/* About */}
                        <label className="input validator">
                            <textarea
                                placeholder="About you"
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                className="w-full bg-transparent"
                            />
                        </label>

                        {/* Error Display */}
                        {error && <p className="text-red-400">{error}</p>}
                        {success && <p className="text-green-400">{success}</p>}

                        {/* Action */}
                        <div className="card-actions justify-center">
                            <button className="btn" onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard user={{firstName,lastName,age,gender,about}}></UserCard>
        </div>




    )
}

export default EditProfile
