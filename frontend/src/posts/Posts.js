import axios from "axios";
import React, { useEffect } from "react";
import Footer from "../profile/Footer";
import Header from "../profile/Header";
import Content from "./Content";

const Posts = ({ userDetails, setUserDetails }) => {
  
  return (
    <div className="profile">
      <Header userDetails={userDetails} setUserDetails={setUserDetails} />
      <Content
      userDetails={userDetails}
      />
      <Footer />
    </div>
  );
  
};

export default Posts;
