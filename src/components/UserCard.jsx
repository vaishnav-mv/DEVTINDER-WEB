import React from 'react'

const UserCard = ({ user, showActions = true }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user

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

        {/* Show buttons only when showActions = true */}
        {showActions && (
          <div className="card-actions justify-center my-4">
            <button className="btn btn-warning">Interested</button>
            <button className="btn btn-secondary">Ignore</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserCard