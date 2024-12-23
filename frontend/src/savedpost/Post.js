import axios from "axios";
import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";

const Post = ({ posts, userDetails }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState("");
  const [loader2, setLoader2] = useState("");
  const [loader3, setLoader3] = useState("");
  const [post, setPost] = useState({});
  const [postedby, setPostedBy] = useState("");
  const [postedin, setPostedIn] = useState("");
  const saved = async () => {
    await axios.put(
      `http://localhost:5000/profile/saved/${userDetails._id}`,
      post
    );
    window.location.reload();
  };

  const handleGoTo = ((e)=>{
    e.preventDefault();
    navigate(`/SubGreddiit/${postedin.name}`)

  })
  const remsaved = async () => {
    await axios.put(
      `http://localhost:5000/profile/remsaved/${userDetails._id}`,
      post
    );
    window.location.reload();
  };
  const handleFunc = (e) => {
    e.preventDefault();
    if (post.Downvotes.includes(userDetails._id)) {
      handleDownrem();
      handleUpadd();
    } else {
      handleUpadd();
    }
  };
  const handleFunc2 = (e) => {
    e.preventDefault();
    if (post.Upvotes.includes(userDetails._id)) {
      handleUprem();
      handleDownadd();
    } else {
      handleDownadd();
    }
  };
  const handleUpadd = async () => {
    await axios.put(
      `http://localhost:5000/posts/Upadd/${userDetails._id}`,
      post
    );
    window.location.reload();
  };
  const handleUprem = async () => {
    await axios.put(
      `http://localhost:5000/posts/Uprem/${userDetails._id}`,
      post
    );
    window.location.reload();
  };
  const handleDownadd = async () => {
    await axios.put(
      `http://localhost:5000/posts/Downadd/${userDetails._id}`,
      post
    );
    window.location.reload();
  };
  const handleDownrem = async () => {
    await axios.put(
      `http://localhost:5000/posts/Downrem/${userDetails._id}`,
      post
    );
    window.location.reload();
  };
  const handleFollow = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:5000/profile/follower/${postedby._id}`,
      userDetails,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await axios.put(
      `http://localhost:5000/profile/following/${userDetails._id}`,
      postedby,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.reload();
  };
  useEffect(() => {
    async function fetchme() {
      const result = await axios.get(
        `http://localhost:5000/posts/getPosts/${posts}`
      );
      setPost(result.data);
      setLoader("done");
      const answer = await axios.get(
        `http://localhost:5000/profile/getuser/${result.data.PostedBy}`
      );
      setPostedBy(answer.data);
      setLoader2("done");
      const answer2 = await axios.get(
        `http://localhost:5000/mySubGreddiit/get/${result.data.PostedIn}`
      );
      setPostedIn(answer2.data);
      setLoader3("done");
    }
    fetchme();
  }, [posts]);
  return loader.length > 0 && loader2.length > 0 && loader3.length > 0 ? (
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-4 text-center">
            <span style={{ fontSize: "2rem", display: "flex" }}>
              Posted by: {postedby.username}
            </span>
          </div>
          <div class="col-4 text-center">
            <span style={{ fontSize: "2rem", display: "flex" }}>
              Posted in: {postedin.name}
            </span>
          </div>
          <div class="col-4 text-center post-1">
            {userDetails.saved.includes(post._id) ? (
              <FavoriteIcon
                fontSize="large"
                type="button"
                onClick={remsaved}
                style={{ color: "rgb(178, 82, 53)" }}
              />
            ) : (
              <FavoriteBorderIcon
                fontSize="large"
                type="button"
                onClick={saved}
              />
            )}

            <button
              className="FilterButton"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target={`#offcanvasfollower${postedby._id}`}
              aria-controls="offcanvasWithBothOptions"
              style={{ fontSize: "1rem" }}
            >
              Visit ProfilePage
            </button>
            <div
              class="offcanvas offcanvas-start"
              data-bs-scroll="true"
              tabindex="-1"
              id={`offcanvasfollower${postedby._id}`}
              aria-labelledby="offcanvasWithBothOptionsLabel"
            >
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">
                  Profile Page
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div class="offcanvas-body">
                <div class="card">
                  <div>
                    <div
                      class="card-img-top"
                      // src={require("./bg_blur.jpeg")}
                      alt="Card image cap"
                    />
                  </div>
                  <div class="card-body little-profile text-center">
                    <div class="pro-img">
                      <img
                        src={require("../images/th.jpeg")}
                        alt="user"
                        class="shadow"
                      />
                    </div>
                    <h3 class="m-b-0" className="details">
                      <span className="admin">{postedby.username}</span>
                    </h3>
                    <h6>
                      <span className="admin_">Name: {postedby.name}</span>
                    </h6>
                    <h6>
                      <span className="admin_">Age: {postedby.age}</span>
                    </h6>
                    <h6>
                      <span className="admin_">
                        Contact: {postedby.contactNum}
                      </span>
                    </h6>
                    <h6>
                      <span className="admin_">Email: {postedby.email}</span>
                    </h6>

                    {userDetails.following.includes(postedby._id) ? (
                      <button className="subButton" data-bs-dismiss="offcanvas">
                        Following <DoneIcon />
                      </button>
                    ) : userDetails._id === postedby._id ? (
                      <></>
                    ) : (
                      <button
                        className="subButton"
                        data-bs-dismiss="offcanvas"
                        onClick={handleFollow}
                      >
                        Follow
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="postWork">
            <div class="row">
              <div class="col-2 thumb">
                {post.Upvotes.length > 0 ? (
                  post.Upvotes.includes(userDetails._id) ? (
                    <ThumbUpAltIcon
                      fontSize="large"
                      type="button"
                      onClick={handleUprem}
                    />
                  ) : (
                    <ThumbUpOffAltIcon
                      fontSize="large"
                      type="button"
                      onClick={handleFunc}
                    />
                  )
                ) : (
                  <ThumbUpOffAltIcon
                    fontSize="large"
                    type="button"
                    onClick={handleFunc}
                  />
                )}
                {post.Downvotes.length > 0 ? (
                  post.Downvotes.includes(userDetails._id) ? (
                    <ThumbDownAltIcon
                      fontSize="large"
                      type="button"
                      onClick={handleDownrem}
                    />
                  ) : (
                    <ThumbDownOffAltIcon
                      fontSize="large"
                      type="button"
                      onClick={handleFunc2}
                    />
                  )
                ) : (
                  <ThumbDownOffAltIcon
                    fontSize="large"
                    type="button"
                    onClick={handleFunc2}
                  />
                )}
              </div>
              <div class="col-10 postText">
                <span className="postContent">{post.Text}</span>
              </div>
            </div>
          </div>
          <div>
            <div class="row">
              <div class="col-6 text-center f-1">
                <span className="special">UpVotes : {post.Upvotes.length}</span>
              </div>
              <div class="col-6 text-center f-1">
                <span className="special">
                  DownVotes : {post.Downvotes.length}
                </span>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="FilterButton" onClick={handleGoTo}>Go to Post</button>
          </div>
          
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Post;
