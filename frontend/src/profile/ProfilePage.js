import React, { useState } from "react";
import Content from "./Content";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const ProfilePage = ({ userDetails, setUserDetails }) => {
  // console.log(userDetails)
  const [loader, setLoader] = useState("");
  const handleDelete = async (UsEr) => {
    const answer = await axios.put(
      `http://localhost:5000/profile/followingDelete/${userDetails._id}`,
      UsEr
    );
    // console.log(answer.data)
    await axios.put(
      `http://localhost:5000/profile/followerDelete/${answer.data._id}`,
      userDetails
    );
    window.location.reload();
  };
  const handleDelete_ = async (UsEr) => {
  
    const user = userDetails
    // console.log(UsEr)
    const answer = await axios.put(
      `http://localhost:5000/profile/followingDelete/${UsEr.user._id}`,
      {user}
    );
    // console.log(answer.data)
    await axios.put(
      `http://localhost:5000/profile/followerDelete/${answer.data._id}`,
      UsEr.user
    );
    window.location.reload();
  };
  return (
    <div className="profile">
      <Header userDetails={userDetails} />
      <Content
        handleDelete={handleDelete}
        handleDelete_={handleDelete_}
        followers={userDetails.follower}
        followings={userDetails.following}
        userDetails={userDetails}
        setUserDetails={setUserDetails}
      />
      <Footer />
    </div>
  );
};

export default ProfilePage;
