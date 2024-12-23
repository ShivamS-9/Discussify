import React from "react";
import { FollowingModal } from "./FollowingModal";

export const FollowingModalList = ({ followings, handleDelete_ }) => {
  // console.log(followings)
  return (
    <ul>
      {followings.map((following) => (
        <FollowingModal following={following} handleDelete_={handleDelete_} />
      ))}
    </ul>
  );
};
