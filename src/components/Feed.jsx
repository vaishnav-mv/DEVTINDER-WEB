import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const users = feed?.data || [];
  const currentUser = users[0];

  return (
    <div className="flex flex-col items-center my-10 min-h-[80vh]">
      {!users.length ? (
        <p className="text-gray-600 text-lg">No more users to display 👀</p>
      ) : currentUser ? (
        <UserCard user={currentUser} type="feed" />
      ) : (
        <p className="text-gray-600 text-lg">
          You’ve reached the end of the feed 🎉
        </p>
      )}
    </div>
  );
};

export default Feed;
