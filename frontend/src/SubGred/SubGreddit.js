import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../profile/Footer";
import Header from "../profile/Header";
import Content from "./Content";

export const SubGreddit = ({ userDetails, setUserDetails }) => {
  const [subG, setSubG] = useState({});
  useEffect(() => {
    async function fetchSubG() {
      const result = await axios.get("http://localhost:5000/subGreddiit");
      // console.log(result)
      setSubG(result.data);
    }
    fetchSubG();
  }, [setSubG]);
  // console.log(subG);
  return (
    <div className="profile">
      <Header userDetails={userDetails} setUserDetails={setUserDetails} />
      <Content posts={subG} userDetails={userDetails}/>
      <Footer />
    </div>
  );
};
