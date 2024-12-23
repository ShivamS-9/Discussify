import React from "react";
import Post from "./Post";
import Navbar from "../profile/Navbar";

const Content = ({userDetails}) => {
  return (
    <div className="content">
      <div class="container">
        <Navbar />
        {userDetails.saved.length === 0 ? (
          <div className="admin">No Saved Posts Yet</div>
        ) : (
          <div className="postAll">
            {userDetails.saved.map((posts) => (
              <div key={posts.id}>
                <Post posts={posts} userDetails={userDetails} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;
