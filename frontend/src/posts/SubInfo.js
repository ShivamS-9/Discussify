import React from "react";

const SubInfo = ({ subG }) => {
  return (
    <div class="card sticky-top">
      <img
        src={subG.imageFile ? subG.imageFile : require("../images/ok.jpeg")}
        className="subImage"
        alt="user"
      />
      <div class="card-body">
        <span className="admin">
          Name: {subG.name}
          {/* <ArrowRightIcon fontSize="large" /> Created At{" "}
          {new Date(subG.createdAt).toLocaleString()} */}
        </span>
        <div className="Details">Description : {subG.description}</div>
        <div className="Details">
          BannedKeywords : {subG.bannedKeywords.join(" ")}
        </div>
        <div class="row">
          <div class="col-6 text-center f-1">
            <span className="special">User {subG.user.length}</span>
          </div>
          <div class="col-6 text-center f-1">
            <span className="special">Posts {subG.postS.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubInfo;
