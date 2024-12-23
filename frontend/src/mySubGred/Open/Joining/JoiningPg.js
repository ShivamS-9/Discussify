import React from "react";
import ReqPg from './ReqPg'

const JoiningPg = ({ userDetails, setUserDetails, subG, setSubG }) => {
  // console.log(subG.requests)
  return subG.requests.length === 0 ? (
    <div className="admin">No Pending Requests</div>
  ) : (
    subG.requests.map((person) => (
      <div class="col" key={person}>
        <ReqPg subG={subG} person={person}/>
      </div>
    ))
  );
};

export default JoiningPg;
