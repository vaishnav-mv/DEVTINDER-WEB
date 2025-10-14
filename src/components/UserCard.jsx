import React from 'react'

const UserCard = ({ user, type = "feed" }) => {
  // Detect if user is nested (request) or direct (connection)
  const userData = user?.fromUserId ? user.fromUserId : user

  // Safely destructure user details
  const { firstName, lastName, photoUrl, age, gender, about } = userData

  // Function to render buttons dynamically
  const renderButtons = () => {
    if (type === "feed") {
      return (
        <>
          <button className="btn btn-warning">Interested</button>
          <button className="btn btn-secondary">Ignore</button>
        </>
      )
    } else if (type === "request") {
      return (
        <>
          <button className="btn btn-success">Accept</button>
          <button className="btn btn-error">Reject</button>
        </>
      )
    } 
    // For connections → no buttons
    return null
  }

  return (
    <div className="card bg-base-300 w-96 shadow-sm rounded-2xl overflow-hidden m-4">
      <figure className="flex justify-center mt-4">
        <img
          src={photoUrl}
          alt="photo"
          className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
        />
      </figure>

      <div className="card-body text-center">
        <h2 className="card-title text-lg font-semibold">
          {firstName + " " + lastName}
        </h2>
        {age && gender && (
          <h3 className="text-sm text-gray-600">
            {gender} • {age} years
          </h3>
        )}
        {about && (
          <p className="text-sm text-gray-700 mt-2">{about}</p>
        )}

        {/* Buttons (conditional rendering) */}
        {type !== "connection" && (
          <div className="card-actions justify-center my-4">
            {renderButtons()}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserCard
