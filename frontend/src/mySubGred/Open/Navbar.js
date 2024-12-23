import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import PortraitIcon from "@mui/icons-material/Portrait";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import PeopleIcon from "@mui/icons-material/People";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import BugReportIcon from "@mui/icons-material/BugReport";

const Navbar = ({ userDetails, setUserDetails, setToggle }) => {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/");
  };
  const handleMySubGreddiit = () => {
    navigate("/mySubGreddiit");
  };
  const handleSubGreddiit = () => {
    navigate("/SubGreddiit");
  };
  const handleSavedPost = () => {
    navigate("/SavedPost");
  };
  const handleOpenUsers = () => {
    setToggle("user");
  };
  const handleJoiningReq = () => {
    setToggle("join");
  };
  const handleStats = () => {
    setToggle("stats");
  };
  const handleReports = () => {
    setToggle("reports");
  };
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span>
            <ArrowDropDownCircleIcon fontSize="large" />
          </span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <button
                class="nav-link active"
                aria-current="page"
                href="#"
                onClick={handleProfile}
              >
                Profile Page <PersonPinIcon fontSize="large" />
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link active"
                aria-current="page"
                href="#"
                onClick={handleMySubGreddiit}
              >
                My Sub-Greddit <PortraitIcon fontSize="large" />
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link active"
                aria-current="page"
                href="#"
                onClick={handleSubGreddiit}
              >
                Sub-Greddit <Diversity3Icon fontSize="large" />
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link active"
                aria-current="page"
                href="#"
                onClick={handleSavedPost}
              >
                Saved Posts <BookmarkIcon fontSize="large" />
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link active"
                aria-current="page"
                href="#"
                onClick={() => handleOpenUsers()}
              >
                Users <PeopleIcon fontSize="large" />
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link active"
                aria-current="page"
                href="#"
                onClick={() => handleJoiningReq()}
              >
                Joining Requests <AddAlertIcon fontSize="large" />
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link active"
                aria-current="page"
                href="#"
                onClick={() => handleStats()}
              >
                Stats <ShowChartIcon fontSize="large" />
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link active"
                aria-current="page"
                href="#"
                onClick={() => handleReports()}
              >
                Reports{" "}
                <BugReportIcon fontSize="large"/>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
