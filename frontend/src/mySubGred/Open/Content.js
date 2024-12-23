import React, { useState } from "react";
import JoiningPg from "./Joining/JoiningPg";
import Navbar from "./Navbar";
import Reports from "./Reports/Reports";
import Stats from "./Stats/Stats";
import UserPg from "./User/UserPg";

const Content = ({ userDetails, setUserDetails, subG, setSubG }) => {
  // console.log(subG);
  const [toggle, setToggle] = useState("user");
  return (
    <div className="content">
      <div class="container">
        <Navbar
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          setToggle={setToggle}
        />
        <div class="col text-center">
          <div
            class="card"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <div class="card-body">
              <span className="Details">{subG.name}</span>
            </div>
          </div>
          <div>
            {toggle === "user" ? (
              <div>
                <UserPg
                  userDetails={userDetails}
                  setUserDetails={setUserDetails}
                  subG={subG}
                  setSubG={setSubG}
                />
              </div>
            ) : toggle === "join" ? (
              <div>
                <JoiningPg
                  userDetails={userDetails}
                  setUserDetails={setUserDetails}
                  subG={subG}
                  setSubG={setSubG}
                />
              </div>
            ) : toggle === "stats" ? (
              <Stats userDetails={userDetails} subG={subG} />
            ) : toggle === "reports" ? (
              <Reports userDetails={userDetails} subG={subG} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
