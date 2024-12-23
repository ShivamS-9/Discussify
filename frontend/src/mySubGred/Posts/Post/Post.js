import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Post = ({ userDetails, post, setCurrentId, currentId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    await axios.put(
      `http://localhost:5000/mySubGreddiit/${currentId}`,
      userDetails
    );
    window.location.reload();
  };
  const handleOpen = (name) => {
    // console.log(name);
    navigate(`/mySubGreddiit/${name}`);
  };
  return (
    <div className="cards">
      <div class="card">
        <img
          src={
            post.imageFile ? post.imageFile : require("../../../images/ok.jpeg")
          }
          className="subImage"
          alt="user"
        />
        <div class="card-body">
          <span className="Details">
            {post.name} <ArrowRightIcon fontSize="large" /> Created At{" "}
            {new Date(post.createdAt).toLocaleString()}
          </span>
          <div className="Details">Description : {post.description}</div>
          {/* <div className="Details">Tags:{post.tags}</div> */}
          {/* <div className="Details"></div> */}
          <div className="Details">
            BannedKeywords : {post.bannedKeywords.join(" ")}
          </div>

          <div>
            <div class="row">
              <div class="col-6 text-center f-1">
                <span className="special">User {post.user.length}</span>
              </div>
              <div class="col-6 text-center f-1">
                <span className="special">Posts {post.postS.length}</span>
              </div>
            </div>

            {/* <div> */}
            <DeleteOutlineIcon
              fontSize="large"
              className="deleteSub"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              onClick={() => setCurrentId(post._id)}
            />
            <div
              class="modal fade"
              id="deleteModal"
              tabindex="-1"
              aria-labelledby="deleteModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1
                      class="modal-title fs-5"
                      id="deleteModalLabel"
                      className="info_"
                    >
                      Delete Sub Greddiit
                    </h1>
                  </div>
                  <div class="modal-body" className="deleteSubG">
                    Are You Sure You Want To Delete This Sub Greddiit?
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
                      No
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={handleDelete}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button className="subButton" onClick={() => handleOpen(post.name)}>
              Open <KeyboardDoubleArrowRightIcon fontSize="large" />
            </button>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
