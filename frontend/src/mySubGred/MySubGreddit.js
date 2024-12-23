import React from "react";
import Footer from "../profile/Footer";
import Header from "../profile/Header";
import Content from "./Content";

export const MySubGreddit = ({userDetails, setUserDetails}) => {
  return (
    <div className="profile">
      <Header userDetails={userDetails} setUserDetails={setUserDetails}/>
      <Content userDetails={userDetails}/>
      <Footer />
    </div>
  );
};
