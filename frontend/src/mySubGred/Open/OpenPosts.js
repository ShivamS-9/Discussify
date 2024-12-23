import React, { useEffect, useState } from "react";
import Footer from "../../profile/Footer";
import Header from "../../profile/Header";
import Content from "./Content";
import axios from "axios";
import { useParams } from "react-router-dom";

const OpenPosts = ({ userDetails, setUserDetails }) => {
  const { sub } = useParams();
  const [subG, setSubG] = useState({});
  const [loader, setLoader] = useState("");
  useEffect(() => {
    async function fetchme() {
      const result = await axios.get(
        `http://localhost:5000/mySubGreddiit/subG/${sub}`
      );
      // console.log(result.data)
      setSubG(result.data);
      setLoader("done");
    }
    fetchme();
  }, [sub]);
  // console.log(subG)
  return loader.length > 0 ? (
    <div className="profile">
      <Header userDetails={userDetails} setUserDetails={setUserDetails} />
      <Content
        userDetails={userDetails}
        setUserDetails={setUserDetails}
        subG={subG}
        setSubG={setSubG}
      />
      <Footer />
    </div>
  ) : (
    <div class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  );
};

export default OpenPosts;
