import React from "react";
import Footer from "../profile/Footer";
import Header from "../profile/Header";
import Content from "./Content";

const SavedPost = ({ userDetails, setUserDetails }) => {
  return (
    <div className="profile">
      <Header userDetails={userDetails} />
      <Content
        userDetails={userDetails}
        // setUserDetails={setUserDetails}
      />
      <Footer />
    </div>
  );
};

export default SavedPost;
