import axios from "axios";
import React, { useEffect, useState } from "react";
import RedditIcon from '@mui/icons-material/Reddit';

const CommentList = ({ com }) => {
  const [cBy, setCBy] = useState("");
  useEffect(() => {
    async function fetch() {
      const result = await axios.get(
        `http://localhost:5000/profile/getuser/${com[0]}`
      );
      // console.log(result.data)
      setCBy(result.data.username);
    }
    fetch();
  }, [com]);
  return <div className="comment"><RedditIcon style={{marginRight:'15px'}}/>{cBy}: {com[1]}</div>;
};

export default CommentList;
