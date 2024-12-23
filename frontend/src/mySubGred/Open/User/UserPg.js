import React from "react";
import Blocked from "./Blocked";
import Users from "./Users";

const UserPg = ({ userDetails, setUserDetails, subG, setSubG }) => {
  // console.log(subG)
  return (
    <div class="container">
      <div class="row">
        <div class="col-lg-7 col-sm-12 text-center">
          <span className="admin">Users</span>
          <Users
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            subG={subG}
            setSubG={setSubG}
          />
        </div>
        <div class="col-lg-5 col-sm-12 text-center">
          <Blocked />
        </div>
      </div>
    </div>
  );
};

export default UserPg;
