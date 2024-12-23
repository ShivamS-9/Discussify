import React, { useEffect, useState } from "react";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";

export const FollowingModal = ({ following, handleDelete_ }) => {
  const [user, setUser] = useState("");
  useEffect(() => {
    async function fetchDt() {
      const detail = await axios.get(
        `http://localhost:5000/profile/getuser/${following}`
      );
      // console.log(detail)
      setUser(detail.data);
    }
    fetchDt();
  }, [following]);
  return (
    <li key={user.id} className={"follower_"}>
      <label>
        {user.username}
        <PersonRemoveIcon
          onClick={() => handleDelete_({user})}
          role="button"
          tabIndex="0"
        />
      </label>
      <button
        className="visit"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target={`#offcanvasfollowing${user._id}`}
        aria-controls="offcanvasWithBothOptions"
      >
        Visit ProfilePage
      </button>
      <div
        class="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabindex="-1"
        id={`offcanvasfollowing${user._id}`}
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

              <button className="subButton">
                <DoneIcon />
                Following
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
