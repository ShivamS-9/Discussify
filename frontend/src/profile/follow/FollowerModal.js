import React, { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";

export const FollowerModal = ({ userDetails, follower, handleDelete }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    async function fetchDt() {
      const detail = await axios.get(
        `http://localhost:5000/profile/getuser/${follower}`
      );
      // console.log(detail)
      setUser(detail.data);
    }
    fetchDt();
  }, [follower, userDetails]);

  const handleFollow = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:5000/profile/follower/${user._id}`,
      userDetails,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await axios.put(
      `http://localhost:5000/profile/following/${userDetails._id}`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.reload();
  };

  return (
    <li key={user.id} className={"follower_"}>
      <label>
        {user.username}
        <RemoveIcon
          onClick={() => handleDelete({ user })}
          role="button"
          tabIndex="0"
        />
      </label>
      <button
        className="visit"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target={`#offcanvasfollower${user._id}`}
        aria-controls="offcanvasWithBothOptions"
      >
        Visit ProfilePage
      </button>
      <div
        class="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabindex="-1"
        id={`offcanvasfollower${user._id}`}
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
                  src={require("../../images/th.jpeg")}
                  alt="user"
                  class="shadow"
                />
              </div>
              <h3 class="m-b-0" className="details">
                <span className="admin">{user.username}</span>
              </h3>
              <h6>
                <span className="admin_">Name: {user.name}</span>
              </h6>
              <h6>
                <span className="admin_">Age: {user.age}</span>
              </h6>
              <h6>
                <span className="admin_">Contact: {user.contactNum}</span>
              </h6>
              <h6>
                <span className="admin_">Email: {user.email}</span>
              </h6>

              {userDetails.following.length > 0 ? (
                userDetails.following.map((r) =>
                  r === user._id ? (
                    <button className="subButton">
                      <DoneIcon />
                      Following
                    </button>
                  ) : (
                    <button
                      className="subButton"
                      data-bs-dismiss="offcanvas"
                      onClick={handleFollow}
                    >
                      Follow
                    </button>
                  )
                )
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
    </li>
  );
};
