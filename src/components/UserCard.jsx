import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeRequest } from "../utils/requestSlice";
import { removeFeedUser } from "../utils/feedSlice";

const UserCard = ({ user, type = "feed" }) => {
  const dispatch = useDispatch();

  const userData = user?.fromUserId ? user.fromUserId : user;
  const requestId = user?._id;
  const { firstName, lastName, photoUrl, age, gender, about } = userData;

  const handleAction = async (action) => {
    try {
      if (type === "request" && requestId) {
        if (action === "accept") {
          await axios.post(
            `${BASE_URL}/request/review/accepted/${requestId}`,
            {},
            { withCredentials: true }
          );
        } else if (action === "reject") {
          await axios.post(
            `${BASE_URL}/request/review/rejected/${requestId}`,
            {},
            { withCredentials: true }
          );
        }
        dispatch(removeRequest(requestId));
      } else if (type === "feed") {
        if (action === "interested") {
          await axios.post(
            `${BASE_URL}/request/send/interested/${userData._id}`,
            {},
            { withCredentials: true }
          );
        } else if (action === "ignore") {
          await axios.post(
            `${BASE_URL}/request/send/ignored/${userData._id}`,
            {},
            { withCredentials: true }
          );
        }
        // ✅ Remove from Redux feed immediately
        dispatch(removeFeedUser(userData._id));
      }
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
    }
  };

  return (
    <div className="card bg-base-300 w-80 shadow-md rounded-2xl overflow-hidden m-4 hover:scale-105 transition-transform duration-200 animate-fade">
      <figure className="flex justify-center mt-4">
        <img
          src={photoUrl}
          alt="profile"
          className="w-28 h-28 object-cover rounded-full border-2 border-gray-300"
        />
      </figure>

      <div className="card-body text-center">
        <h2 className="card-title text-lg font-semibold">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <h3 className="text-sm text-gray-600">
            {gender} • {age} years
          </h3>
        )}
        {about && <p className="text-sm text-gray-700 mt-2">{about}</p>}

        <div className="card-actions justify-center my-4">
          {type === "feed" && (
            <>
              <button
                className="btn btn-warning"
                onClick={() => handleAction("interested")}
              >
                Interested
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleAction("ignore")}
              >
                Ignore
              </button>
            </>
          )}

          {type === "request" && (
            <>
              <button
                className="btn btn-success"
                onClick={() => handleAction("accept")}
              >
                Accept
              </button>
              <button
                className="btn btn-error"
                onClick={() => handleAction("reject")}
              >
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
