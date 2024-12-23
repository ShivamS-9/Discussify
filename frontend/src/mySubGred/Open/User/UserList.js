import axios from "axios";
import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { useNavigate } from "react-router-dom";

const UserList = ({ userDetails, subG, person }) => {
  // console.log(person)
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const handleProfile = (e) => {
    e.preventDefault();
    navigate("/");
  };
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
  useEffect(() => {
    async function fetch() {
      const result = await axios.get(
        `http://localhost:5000/profile/getuser/${person}`
      );
      // console.log(result.data);
      setUser(result.data);
    }
    fetch();
  }, [person]);
  return (
    <div class="card">
      <div class="card-body">
        <div className="requests">
          {user.username}
          <button
            className="FilterButton"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target={`#offcanvas${user._id}`}
            aria-controls="offcanvasWithBothOptions"
            style={{ fontSize: "1rem" }}
          >
            Visit ProfilePage
          </button>
          <div
            class="offcanvas offcanvas-start"
            data-bs-scroll="true"
            tabindex="-1"
            id={`offcanvas${user._id}`}
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
                      src={require("../../../images/th.jpeg")}
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
                  {userDetails._id === user._id ? (
                    <button
                      className="subButton"
                      data-bs-dismiss="offcanvas"
                      onClick={handleProfile}
                    >
                      Go To Profile
                    </button>
                  ) : userDetails.following.includes(user._id) ? (
                    <button className="subButton" data-bs-dismiss="offcanvas">
                      Following
                      <DoneIcon />
                    </button>
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
        </div>
      </div>
    </div>
  );
};

export default UserList;
