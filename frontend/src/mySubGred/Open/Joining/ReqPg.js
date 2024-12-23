import axios from "axios";
import React, {  useEffect, useState } from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";

const ReqPg = ({ subG, person }) => {
  // console.log(subG)
  const [req, setReq] = useState({});
  useEffect(() => {
    async function fetch() {
      const result = await axios.get(
        `http://localhost:5000/profile/getuser/${person}`
      );
      // console.log(result.data)
      setReq(result.data);
    }
    fetch();
  }, [req, person]);
  const acceptReq = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/mySubGreddiit/acceptReq/${person}`, subG)
    console.log('helooooo')
    window.location.reload(false);
  };
  const rejectReq = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/mySubGreddiit/rejectReq/${person}`, subG)
    window.location.reload(false);
  };
  return (
    <div class="card ">
      <div class="card-body">
        <div className="requests">
          {req.username}
          <div>
            <DoneAllIcon
              type="button"
              fontSize="large"
              style={{ color: "green", marginRight: "10px" }}
              onClick={acceptReq}
            />
            <CloseIcon
              type="button"
              fontSize="large"
              style={{ color: "#973a2c" }}
              onClick={rejectReq}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReqPg;
