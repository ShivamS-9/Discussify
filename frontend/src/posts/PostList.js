import React from "react";
import Post from "./Post";

const PostList = ({ subG, userDetails }) => {
  return subG.postS.length === 0 ? (
    <div className="admin">No Posts Yet</div>
  ) : (
    <div className="postAll">
      {subG.postS.map((posts) => (
        <div id = {posts} key={posts}>
          <Post subG={subG} posts={posts} userDetails={userDetails} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
