import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";

const Comment = ({ userDetails, post, ctoggle, setCtoggle }) => {
  const [cmnt, setCmnt] = useState({
    post,
    userDetails,
    comment: "",
  });
  const [finalComm, setFinalComm] = useState("");
  useEffect(() => {
    async function fetch() {
      const result = await axios.get(
        `http://localhost:5000/posts/getcomment/${post._id}`
      );
      setFinalComm(result.data.comments);
    }
    fetch();
  }, [post._id]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:5000/posts/comment/${userDetails._id}`,
      cmnt
    );
    setCtoggle(!ctoggle);
    // window.location.reload();
  };
  // console.log(finalComm);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="comment"
          autoFocus
          placeholder="Add Comment"
          onChange={(e) => setCmnt({ ...cmnt, comment: e.target.value })}
          style={{
            width: "410px",
            backgroundColor: "rgb(164 182 189)",
            fontSize: "1.25rem",
          }}
        />
        <button
          type="submit"
          className="FilterButton"
          style={{ width: "150px" }}
        >
          Add
        </button>
      </form>
      <div style={{ display: "flex", flexDirection: "column-reverse" }}>
        {finalComm.length > 0 ? (
          finalComm.map((com) => (
            <div key={com._id}>
              <CommentList com={com} />
            </div>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Comment;
