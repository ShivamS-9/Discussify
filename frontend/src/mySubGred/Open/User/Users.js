import React from "react";
import UserList from "./UserList";

const Users = ({ userDetails, setUserDetails, subG, setSubG }) => {
  // console.log(subG)
  return subG.user.length === 0 ? (
    <div className="admin">No user Found</div>
  ) : (
    subG.user.map((person) => (
      <div class="col" key={person}>
        <UserList userDetails={userDetails} subG={subG} person={person} />
      </div>
    ))
  );
  
};

export default Users;
