import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProfilePage from "../profile/ProfilePage";
import Home from "../home/Home";
import axios from "axios";
import Layout from "./Layout";
import { MySubGreddit } from "../mySubGred/MySubGreddit";
import { SubGreddit } from "../SubGred/SubGreddit";
import OpenPosts from "../mySubGred/Open/OpenPosts";
import Posts from "../posts/Posts";
import SavedPost from "../savedpost/SavedPost";

function App() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [loader, setLoader] = useState("");
  const [loader2, setLoader2] = useState("");
  useEffect(() => {
    async function fetchIt() {
      const info = JSON.parse(localStorage.getItem("token"));
      // console.log(info);
      if (info) {
        try {
          const userdata = await axios.get("http://localhost:5000/profile", {
            headers: {
              Authorization: `Bearer ${info}`,
            },
          });
          // console.log(userdata);
          setUserDetails(userdata.data);
          setLoader("loaded");
        } catch (error) {
          navigate("/home");
        }
      } else {
        navigate("/home");
        setLoader2("loaded");
        console.log("No info");
      }
    }
    fetchIt();
  }, [navigate]);
  // console.log(userDetails)
  return loader === "loaded" || loader2 === 'loaded'? (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ProfilePage
              userDetails={userDetails}
              setUserDetails={setUserDetails}
            />
          }
        />
        <Route path="home" element={<Home />} />
        <Route
          path="mySubGreddiit"
          element={
            <MySubGreddit
              userDetails={userDetails}
              setUserDetails={setUserDetails}
            />
          }
        />
        <Route
          path="SubGreddiit/:sub"
          element={
            <Posts
              userDetails={userDetails}
              setUserDetails={setUserDetails}
            />
          }
        />
        <Route
          path="mySubGreddiit/:sub"
          element={
            <OpenPosts
              userDetails={userDetails}
              setUserDetails={setUserDetails}
            />
          }
        />
        <Route
          path="SubGreddiit"
          element={
            <SubGreddit
              userDetails={userDetails}
              setUserDetails={setUserDetails}
            />
          }
        />
        <Route
          path="SavedPost"
          element={
            <SavedPost
              userDetails={userDetails}
              setUserDetails={setUserDetails}
            />
          }
        />
        {/* <Route path='error' element={<Error_ />} /> */}
      </Route>
    </Routes>
  ) : (
    <div class="text-center">
      <div class="spinner-grow text-dark" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default App;
