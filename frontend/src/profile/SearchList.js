import React from "react";
import axios from "axios";
import DoneIcon from "@mui/icons-material/Done";

const SearchList = ({ result, userDetails }) => {
  // const [dummy, setDummy] = useState(false);
  const handleFollow = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:5000/profile/follower/${result._id}`,
      userDetails,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    await axios.put(
      `http://localhost:5000/profile/following/${userDetails._id}`,
      result,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.reload();
  };
  // console.log(result);
  return (
    <li
      class="list-group-item"
      key={result._id}
      // onClick={() => handleSelectUser(result)}
    >
      <span className="searchItem flex-fill">{result.username}</span>
      <button
        className="visit"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target={`#offcanvas${result._id}`}
        aria-controls="offcanvasWithBothOptions"
      >
        Visit ProfilePage
      </button>
      <div
        class="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabindex="-1"
        id={`offcanvas${result._id}`}
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
                  src={require("../images/th.jpeg")}
                  alt="user"
                  class="shadow"
                />
              </div>
              <h3 class="m-b-0" className="details">
                <span className="admin">{result.username}</span>
              </h3>
              <h6>
                <span className="admin_">Name: {result.name}</span>
              </h6>
              <h6>
                <span className="admin_">Age: {result.age}</span>
              </h6>
              <h6>
                <span className="admin_">Contact: {result.contactNum}</span>
              </h6>
              <h6>
                <span className="admin_">Email: {result.email}</span>
              </h6>
              {userDetails.following.includes(result._id) ? (
                <button
                  className="subButton"
                  data-bs-dismiss="offcanvas"
                  // onClick={handleFollow}
                >
                  Following <DoneIcon />
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
    </li>
  );
};

export default SearchList;
