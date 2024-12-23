import React from "react";
import AllPosts from "./AllPosts";

const AllPostsList = ({ posts, userDetails }) => {
  // console.log(posts)

  return !posts.length ? (
    <div className="admin" style={{ display: "flex", justifyContent: "center", marginTop:'3rem' }}>
      No Sub Greddiit till Now
    </div>
  ) : (
    <div>
      {posts.map((post) => {
        if (post.user.includes(userDetails._id)) {
          return (
            <div class="col" key={post._id}>
              <AllPosts post={post} userDetails={userDetails} />
            </div>
          );
        } else return <div></div>;
      })}
      {posts.map((post) => {
        if (!post.user.includes(userDetails._id)) {
          return (
            <div class="col" key={post._id}>
              <AllPosts post={post} userDetails={userDetails} />
            </div>
          );
        } else return <div></div>;
      })}
    </div>
  );
};

export default AllPostsList;
