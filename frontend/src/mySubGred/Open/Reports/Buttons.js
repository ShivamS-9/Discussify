import axios from "axios";
import React, { useEffect, useState } from "react";

const Buttons = ({ userDetails, subG, report }) => {
  const [countdown, setCountdown] = useState(3);
  const [blocking, setBlocking] = useState(false);

  useEffect(() => {
    let intervalId;
    if (blocking && countdown > 0) {
      intervalId = setInterval(() => {
        setCountdown((countdown) => countdown - 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [blocking, countdown]);

  const cancelBlocking = () => {
    setBlocking(false);
    setCountdown(3);
  };
  const [block, setBlock] = useState(true);
  const [delete_, setDelete] = useState(true);
  const handleIgnore = async (e) => {
    e.preventDefault();
    setBlock(false);
    setDelete(false);
    await axios.put(
      `http://localhost:5000/mySubGreddiit/removeReq/${subG._id}`,
      report
    );
  };
  const handleBlock = (e) => {
    e.preventDefault();
    setBlocking(true);
    setCountdown(3);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:5000/mySubGreddiit/removeReq/${subG._id}`,
      report
    );
    await axios.put(`http://localhost:5000/posts/removePost/${report[4]}`);
  };
  return (
    <div>
      <div class="row" style={{ justifyContent: "space-evenly" }}>
        <div class="col-lg-4 col-sm-12">
          <button
            className="subButton"
            style={{ width: "100%" }}
            onClick={handleIgnore}
          >
            Ignore
          </button>
        </div>
        {block === true ? (
          <div class="col-lg-4 col-sm-12">
            {blocking ? (
              <button
                className="subButton"
                style={{ width: "100%" }}
                onClick={cancelBlocking}
                // disabled={blocking}
              >
                {`Cancel in ${countdown} secs`}
              </button>
            ) : (
              <button
                className="subButton"
                style={{ width: "100%" }}
                onClick={handleBlock}
                disabled={blocking}
              >
                Block User
              </button>
            )}
            
          </div>
        ) : (
          <div class="col-lg-4 col-sm-12">
            <button
              style={{
                width: "100%",
                margin: "1rem",
                fontSize: "1.5rem",
                transition: "0.5s",
                cursor: "default",
                padding: "1rem",
                fontFamily: "myFirstFont",
                background: "rgb(2, 0, 36)",
                color: "white",
              }}
              disabled
              // onClick={handleBlock}
            >
              Block User
            </button>
          </div>
        )}
        {delete_ === true ? (
          <div class="col-lg-4 col-sm-12">
            <button
              className="subButton"
              style={{ width: "100%" }}
              onClick={handleDelete}
            >
              Delete Post
            </button>
          </div>
        ) : (
          <div class="col-lg-4 col-sm-12">
            <button
              style={{
                width: "100%",
                margin: "1rem",
                fontSize: "1.5rem",
                transition: "0.5s",
                cursor: "default",
                padding: "1rem",
                fontFamily: "myFirstFont",
                background: "rgb(2, 0, 36)",
                color: "white",
              }}
              disabled
              // onClick={handleBlock}
            >
              Delete Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Buttons;
