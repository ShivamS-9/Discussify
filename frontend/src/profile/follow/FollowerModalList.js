import React from "react";
import { FollowerModal } from "./FollowerModal";

export const FollowerModalList = ({ userDetails, followers, handleDelete }) => {
  // console.log(followers)
  return (
    <ul>
      {followers.map((follower) => (
        <FollowerModal follower={follower} handleDelete={handleDelete} userDetails={userDetails}/>
      ))}
    </ul>
  );
};
