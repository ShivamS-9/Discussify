import React, { useEffect, useState } from "react";
import Navbar from "../profile/Navbar";
import SubInfo from "./SubInfo";
import { useParams } from "react-router-dom";
import PostList from "./PostList";
import axios from "axios";
import CreatePost from "./CreatePost";

const Content = ({ userDetails }) => {
  const [post, setPost]=useState({})
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
  return (
    <div className="content">
      <div class="container">
        <Navbar />

        {loader.length > 0 ? (
          <div>
            <CreatePost userDetails={userDetails} subG={subG} post={post} setPost={setPost}/>
            <div class="row">
              <div class="col-lg-4 col-sm-12 text-center">
                <SubInfo subG={subG} />
              </div>
              <div class="col-lg-8 col-sm-12 text-center">
                <PostList subG={subG} userDetails={userDetails}/>
              </div>
            </div>
          </div>
        ) : (
          <div class="spinner-grow" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
