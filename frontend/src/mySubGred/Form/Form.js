import React, { useState } from "react";
import LoupeIcon from "@mui/icons-material/Loupe";
import { useDispatch } from "react-redux";
import FileBase from "react-file-base64";
import { createPost} from "../../actions/posts";
const Form = ({ currentId, setCurrentId, userDetails }) => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    name: "",
    description: "",
    tags: "", // singleWord, lowerCase, Multiple
    bannedKeywords: "", //SingleWord, CaseInsensative, Multiple
    imageFile: "",
    createdBy: userDetails._id,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (postData.imageFile === "") {
    //   window.alert("Please Select an Image");
    // } else {
      dispatch(createPost(postData));
      setCurrentId(null);
      window.location.reload();
    // }
  };

  return (
    <div class="box sticky-top">
      <div class="box-inner">
        <div class="box-front">
          <span>
            Create a Sub Greddiit <LoupeIcon fontSize="larger" />
          </span>
        </div>
        <div class="box-back">
          <span className="subG">Sub Greddit</span>
          <form
            className="subGform"
            // aria-autocomplete="off"
            onSubmit={handleSubmit}
          >
            <input
              name="name"
              variant="outlined"
              placeholder="Name"
              label="Name"
              autoFocus
              value={postData.name}
              onChange={(e) =>
                setPostData({ ...postData, name: e.target.value })
              }
              required
            />
            <input
              name="description"
              variant="outlined"
              placeholder="Description"
              type="description"
              label="Description"
              value={postData.description}
              onChange={(e) =>
                setPostData({ ...postData, description: e.target.value })
              }
              required
            />
            <input
              name="tags"
              variant="outlined"
              placeholder="Tags"
              type="tags"
              multiple={true}
              label="Tags"
              value={postData.tags}
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value })
              }
              required
            />
            <input
              name="bannedKeywords"
              variant="outlined"
              multiple={true}
              placeholder="Banned Keywords"
              label="BannedKeywords"
              value={postData.bannedKeywords}
              onChange={(e) =>
                setPostData({ ...postData, bannedKeywords: e.target.value })
              }
              required
            />
            <div>
              <FileBase
                type="file"
                // multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, imageFile: base64 })
                }
              />
            </div>
            <button className="subGBtn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
