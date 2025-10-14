import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user, type = "feed" }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [message, setMessage] = useState("");

  // Extract correct user info
  const userData = user?.fromUserId ? user.fromUserId : user;
  const requestId = user?._id;
  const { firstName, lastName, photoUrl, age, gender, about } = userData;

  // Handle button actions
  const handleAction = async (action) => {
    try {
      let successMessage = "";

      if (type === "request" && requestId) {
        if (action === "accept") {
          await axios.post(
            `${BASE_URL}/request/review/accepted/${requestId}`,
            {},
            { withCredentials: true }
          );
          successMessage = `You accepted ${firstName}'s request ✅`;
        } else if (action === "reject") {
          await axios.post(
            `${BASE_URL}/request/review/rejected/${requestId}`,
            {},
            { withCredentials: true }
          );
          successMessage = `You rejected ${firstName}'s request ❌`;
        }
      } else if (type === "feed") {
        if (action === "interested") {
          await axios.post(
            `${BASE_URL}/request/send/interested/${userData._id}`,
            {},
            { withCredentials: true }
          );
          successMessage = `You showed interest in ${firstName} 💛`;
        } else if (action === "ignore") {
          await axios.post(
            `${BASE_URL}/request/send/ignored/${userData._id}`,
            {},
            { withCredentials: true }
          );
          successMessage = `You ignored ${firstName} 🙈`;
        }
      }

      // ✅ Smoothly hide card
      setIsVisible(false);
      setMessage(successMessage);

      // Auto-hide message after 2s
      setTimeout(() => setMessage(""), 2000);

      console.log(`Action ${action} done for`, userData.firstName);
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
      setMessage("Something went wrong. Please try again.");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  // If message exists and card hidden — show only message
  if (!isVisible && message) {
    return (
      <div className="text-center text-lg font-medium text-gray-700 my-10 animate-fade">
        {message}
      </div>
    );
  }

  // If card is hidden and message expired, render nothing
  if (!isVisible) return null;

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

        {/* Action Buttons */}
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
