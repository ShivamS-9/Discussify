import axios from "axios";
import React, { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import Buttons from "./Buttons";

const ReportList = ({ userDetails, report ,subG}) => {
  // console.log(report)
  const [loader, setLoader] = useState("");
  const [postedby, setPostedby] = useState({});
  const [reportedby, setReportedby] = useState({});
  useEffect(() => {
    async function fetch() {
      const result = await axios.get(
        `http://localhost:5000/profile/getuser/${report[2]}`
      );
      // console.log(result.data)
      setPostedby(result.data);
      const answer = await axios.get(
        `http://localhost:5000/profile/getuser/${report[1]}`
      );
      // console.log(result.data)
      setReportedby(answer.data);
      setLoader("done");
    }
    fetch();
  }, [report]);
  const handleFollow = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:5000/profile/follower/${report[2]}`,
      userDetails,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await axios.put(
      `http://localhost:5000/profile/following/${userDetails._id}`,
      postedby,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.reload();
  };
  return loader.length > 0 ? (
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-lg-2 col-sm-12 text-center">
            <span style={{ fontSize: "2rem", display: "flex" }}>
              Posted by: {postedby.username}
            </span>
          </div>
          <div class="col-lg-4 col-sm-12 text-center post-1">
            <button
              className="FilterButton"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target={`#offcanvasfollower${postedby._id}`}
              aria-controls="offcanvasWithBothOptions"
              style={{ fontSize: "1rem" }}
            >
              Visit ProfilePage
            </button>
            <div
              class="offcanvas offcanvas-start"
              data-bs-scroll="true"
              tabindex="-1"
              id={`offcanvasfollower${postedby._id}`}
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
                      <span className="admin">{postedby.username}</span>
                    </h3>
                    <h6>
                      <span className="admin_">Name: {postedby.name}</span>
                    </h6>
                    <h6>
                      <span className="admin_">Age: {postedby.age}</span>
                    </h6>
                    <h6>
                      <span className="admin_">
                        Contact: {postedby.contactNum}
                      </span>
                    </h6>
                    <h6>
                      <span className="admin_">Email: {postedby.email}</span>
                    </h6>

                    {userDetails.following.includes(postedby._id) ? (
                      <button className="subButton" data-bs-dismiss="offcanvas">
                        Following <DoneIcon />
                      </button>
                    ) : userDetails._id === postedby._id ? (
                      <></>
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
          <div class="col-lg-2 col-sm-12 text-center">
            <span style={{ fontSize: "2rem", display: "flex" }}>
              Reported by: {reportedby.username}
            </span>
          </div>
          <div class="col-lg-4 col-sm-12text-center post-1">
            <button
              className="FilterButton"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target={`#offcanvasfollower${reportedby._id}`}
              aria-controls="offcanvasWithBothOptions"
              style={{ fontSize: "1rem" }}
            >
              Visit ProfilePage
            </button>
            <div
              class="offcanvas offcanvas-start"
              data-bs-scroll="true"
              tabindex="-1"
              id={`offcanvasfollower${reportedby._id}`}
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
                      <span className="admin">{reportedby.username}</span>
                    </h3>
                    <h6>
                      <span className="admin_">Name: {reportedby.name}</span>
                    </h6>
                    <h6>
                      <span className="admin_">Age: {reportedby.age}</span>
                    </h6>
                    <h6>
                      <span className="admin_">
                        Contact: {reportedby.contactNum}
                      </span>
                    </h6>
                    <h6>
                      <span className="admin_">Email: {reportedby.email}</span>
                    </h6>

                    {userDetails.following.includes(reportedby._id) ? (
                      <button className="subButton" data-bs-dismiss="offcanvas">
                        Following <DoneIcon />
                      </button>
                    ) : userDetails._id === reportedby._id ? (
                      <></>
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
        <div>
          <div className="postWork">
            <div class="row" style={{ justifyContent: "space-evenly" }}>
              <div class="col-lg-5 col-sm-12 postText">
                <span className="postContent">Reported Text: {report[3]}</span>
              </div>
              <div class="col-lg-5 col-sm-12 postText">
                <span className="postContent">
                  Reported Concern: {report[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Buttons 
        userDetails={userDetails} subG={subG} report={report}/>
      </div>
    </div>
  ) : (
    <div class="spinner-grow" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  );
};

export default ReportList;
