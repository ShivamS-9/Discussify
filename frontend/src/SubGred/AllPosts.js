import React, { useEffect, useState } from "react";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DoneIcon from "@mui/icons-material/Done";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllPost = ({ post, userDetails }) => {
  const navigate = useNavigate();
  // console.log(post)
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchModerator() {
      const userName = await axios.get(
        `http://localhost:5000/profile/getuser/${post.createdBy}`
      );
      // console.log(userName.data.username);
      setName(userName.data.username);
    }
    fetchModerator();
  }, [name, post.createdBy]);
  const handleJoin = async (e) => {
    e.preventDefault();
    await axios.post(
      `http://localhost:5000/mysubGreddiit/sendReq/${post._id}`,
      userDetails
    );
    window.location.reload();
  };

  const handleLeave = async (e) => {
    e.preventDefault();
    await axios.post(
      `http://localhost:5000/mysubGreddiit/sendLeave/${post._id}`,
      userDetails
    );
    window.location.reload();
  };
  const handleOpen = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:5000/mySubGreddiit/handleVisitor/${post._id}`, )
    navigate(`/SubGreddiit/${post.name}`);
  };
  return (
    <div class="container text-center">
      <div class="card">
        <div class="card-body">
          <div className="moderator">Moderator: {name}</div>
          <span className="Details">
            {post.name} <ArrowRightIcon fontSize="large" /> Created At{" "}
            {new Date(post.createdAt).toLocaleString()}
          </span>
          <div className="Details">Description : {post.description}</div>
          <div className="Details">Tags : {post.tags.join(" ")}</div>

          <div className="Details">
            BannedKeywords : {post.bannedKeywords.join(" ")}
          </div>
          <div class="row">
            <div class="col-6 text-center f-1">
              <span className="special">User {post.user.length}</span>
            </div>
            <div class="col-6 text-center f-1">
              <span className="special">Posts {post.postS.length}</span>
            </div>
          </div>
        </div>
        <div>
          {post.user.includes(userDetails._id) ? (
            <button className="subButton" onClick={handleOpen}>
              Open Posts
              <KeyboardDoubleArrowRightIcon fontSize="large" />
            </button>
          ) : (
            <button className="subButton" disabled={true}>
              Join To Open Posts
              <ArrowForwardIcon fontSize="large" />
            </button>
          )}

          {name === userDetails.username ? (
            <button
              className="ModeratorButton"
              disabled={true}
              style={{ cursor: "default" }}
            >
              Moderator <DoneIcon fontSize="large" />
            </button>
          ) : !post.user.includes(userDetails._id) &&
            !post.requests.includes(userDetails._id) &&
            !post.left.includes(userDetails._id) ? (
            <button className="FilterButton" onClick={handleJoin}>
              Join <AddBoxIcon fontSize="large" />
            </button>
          ) : post.requests.includes(userDetails._id) &&
            !post.user.includes(userDetails._id) ? (
            <button
              className="ModeratorButton"
              disabled={true}
              style={{ cursor: "default" }}
            >
              Requested <ArrowOutwardIcon fontSize="large" />
            </button>
          ) : post.user.includes(userDetails._id) &&
            !post.left.includes(userDetails._id) ? (
            <button className="FilterButton" onClick={handleLeave}>
              Leave <ExitToAppIcon fontSize="large" />
            </button>
          ) : post.left.includes(userDetails._id) ? (
            <button
              type="button"
              className="ModeratorButton"
              style={{ cursor: "default" }}
            >
              Can't Join <CloseIcon fontSize="large" />
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPost;
