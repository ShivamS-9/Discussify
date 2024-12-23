import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";

const CreatePost = ({ userDetails, subG, post, setPost }) => {
  const [postData, setPostData] = useState({
    text: "",
    subG,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const content_split = new Set(postData.text.toLowerCase().split(/[\s,]+/));
    console.log(content_split);
    const cont = [];
    for (let i = 0; i < subG.bannedKeywords.length; i++) {
      if (content_split.has(subG.bannedKeywords[i])) {
        cont.push(subG.bannedKeywords[i]);
      }
    }
    if (cont.length > 0) alert(`The post contains ${cont} banned words`);
    const result = await axios.put(
      `http://localhost:5000/posts/${userDetails._id}`,
      postData
    );
    setPost(result.data);
    // console.log(post)
    window.location.reload();
  };
  useEffect(() => {
    async function fetchit() {
      await axios.post(
        `http://localhost:5000/subGreddiit/addPosts/${subG._id}`,
        post
      );
      // console.log(okay);
    }
    fetchit();
  }, [post, subG._id]);
  return (
    <div
      class="card"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <button
        class="card-body"
        style={{ background: "none", fontSize: "2rem" }}
        data-bs-toggle="modal"
        data-bs-target="#createPostModal"
      >
        Create Post <AddCircleOutlineIcon fontSize="large" />
      </button>
      <div
        class="modal fade"
        id="createPostModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 className="follower" id="exampleModalLabel">
                Create Post
              </h1>
            </div>
            <div class="modal-body" style={{ marginTop: "-1rem" }}>
              <form className="post" onSubmit={handleSubmit}>
                <input
                  className="post_text"
                  type="text"
                  placeholder="Enter Text"
                  autoFocus
                  id="text"
                  name="text"
                  required
                  onChange={(e) =>
                    setPostData({ ...postData, text: e.target.value })
                  }
                />
                <div style={{ marginTop: "1.5rem" }}>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    class="btn btn-primary"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
