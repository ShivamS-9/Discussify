import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import Person4Icon from "@mui/icons-material/Person4";
import { FollowerModalList } from "./follow/FollowerModalList";
import { FollowingModalList } from "./follow/FollowingModalList";
import Navbar from "./Navbar";
import axios from "axios";

const Content = ({
  handleDelete,
  handleDelete_,
  followers,
  followings,
  userDetails,
}) => {
  const [editData, setEditData] = useState({});

  const handleEdit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:5000/profile/${userDetails._id}`,
      editData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(newdata.data);
    // setUserDetails(newdata.data);
    window.location.reload();
  };

  return (
    <div className="content">
      <div class="container">
        <Navbar />
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
                src={require("../images/th.jpeg")}
                alt="user"
                class="shadow"
              />
            </div>
            <h3 class="m-b-0" className="details">
              <EditIcon
                className="edit"
                role="button"
                tabIndex="-1"
                data-bs-toggle="modal"
                data-bs-target="#editModal"
              />
              <div
                class="modal fade"
                id="editModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-fullscreen-sm-down modal-dialog-centered modal-dialog-scrollable">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1
                        class="modal-title fs-5"
                        className="editTitle"
                        id="exampleModalLabel"
                      >
                        Edit
                      </h1>
                    </div>
                    <div class="modal-body ">
                      <form className="login_form" onSubmit={handleEdit}>
                        {/* <input
                          className="edit_form"
                          type="name"
                          placeholder="Edit First Name"
                          id="firstName"
                          name="firstName"
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              firstName: e.target.value,
                            })
                          }
                        /> */}
                        {/* <input
                          className="edit_form"
                          type="name"
                          placeholder="Edit Last Name"
                          id="lastName"
                          name="lastName"
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              lastName: e.target.value,
                            })
                          }
                        /> */}
                        <input
                          className="edit_form"
                          type="number"
                          placeholder="Edit Age"
                          id="age"
                          name="age"
                          onChange={(e) =>
                            setEditData({ ...editData, age: e.target.value })
                          }
                        />
                        <input
                          className="edit_form"
                          // type="number"
                          placeholder="Edit Contact Number"
                          id="contactNum"
                          name="contactNum"
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              contactNum: e.target.value,
                            })
                          }
                        />
                        <input
                          className="edit_form"
                          type="email"
                          placeholder="Edit Email"
                          id="email"
                          name="email"
                          onChange={(e) =>
                            setEditData({ ...editData, email: e.target.value })
                          }
                        />
                        <div>
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
              <span className="admin">{userDetails.username}</span>
              <MoreVertIcon
                className="more"
                role="button"
                tabIndex="-1"
                data-bs-toggle="modal"
                data-bs-target="#moreModal"
              />
              <div
                class="modal fade"
                id="moreModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-fullscreen-sm-down modal-dialog-centered modal-dialog-scrollable">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1
                        class="modal-title fs-5"
                        id="exampleModalLabel"
                        className="info_"
                      >
                        Information
                      </h1>
                    </div>
                    <div class="modal-body">
                      <div className="info">Name : {userDetails.name}</div>
                      <div className="info">Age: {userDetails.age}</div>
                      <div className="info">
                        Contact: {userDetails.contactNum}
                      </div>
                      <div className="info">Email: {userDetails.email}</div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </h3>

            <div class="row text-center m-t-20">
              <div
                class="col-lg-6 col-md-6 f-1"
                role="button"
                tabIndex="-1"
                data-bs-toggle="modal"
                data-bs-target="#followerModal"
              >
                <h3 class="m-b-0 font-light">{followers.length}</h3>
                <Person4Icon />
                <span className="special">Followers</span>
              </div>
              <div
                class="modal fade"
                id="followerModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div class="modal-content">
                    <div class="modal-header ">
                      <h1
                        class="modal-title fs-5"
                        id="exampleModalLabel"
                        className="follower"
                      >
                        My Followers
                      </h1>
                    </div>
                    <div class="modal-body">
                      {followers.length ? (
                        <FollowerModalList
                          userDetails={userDetails}
                          followers={followers}
                          handleDelete={handleDelete}
                        />
                      ) : (
                        <p className="info">No Followers</p>
                      )}
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="col-lg-6 col-md-6 f-1"
                role="button"
                tabIndex="-1"
                data-bs-toggle="modal"
                data-bs-target="#followingModal"
              >
                <h3 class="m-b-0 font-light">{followings.length}</h3>
                <Person4Icon />
                <span className="special">Following</span>
              </div>
              <div
                class="modal fade"
                id="followingModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1
                        class="modal-title fs-5"
                        id="exampleModalLabel"
                        className="follower"
                      >
                        My Followings
                      </h1>
                    </div>
                    <div class="modal-body">
                      {followings.length ? (
                        <FollowingModalList
                          handleDelete_={handleDelete_}
                          followings={followings}
                        />
                      ) : (
                        <p className="info">No Followings</p>
                      )}
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
