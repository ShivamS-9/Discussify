import React from "react";
import Post from "./Post/Post";
import { useSelector } from "react-redux";

const Posts = ({ setCurrentId, currentId, userDetails }) => {
  const posts = useSelector((state) => state.posts);
  // console.log(posts);
  return !posts.length ? (
    <div className="admin" style={{ display: "flex", alignItems: "center" }}>
      No Sub Greddiit till Now
    </div>
  ) : (
    <div>
      {posts.map((post) =>
        post.createdBy === userDetails._id ? (
          <div key={post._id}>
            <Post
              userDetails={userDetails}
              post={post}
              setCurrentId={setCurrentId}
              currentId={currentId}
            />
          </div>
        ) : (
          <></>
        )
      )}
    </div>
  );
};

export default Posts;
