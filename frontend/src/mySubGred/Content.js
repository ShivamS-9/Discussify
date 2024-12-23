import React, { useState, useEffect } from "react";
import Navbar from "../profile/Navbar";
import { getPosts } from "../actions/posts";
import Form from "./Form/Form";
import Posts from "./Posts/Posts";
import { useDispatch } from "react-redux";

const Content = ({ userDetails }) => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <div className="content">
      <div class="container">
        <Navbar />
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-sm-12 text-center">
              <Form
                currentId={currentId}
                setCurrentId={setCurrentId}
                userDetails={userDetails}
              />
            </div>
            <div class="col-lg-8 col-sm-12 text-center">
              <Posts
                currentId={currentId}
                setCurrentId={setCurrentId}
                userDetails={userDetails}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
