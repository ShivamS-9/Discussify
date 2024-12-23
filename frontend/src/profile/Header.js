import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import RedditIcon from "@mui/icons-material/Reddit";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchList from "./SearchList";

const Header = ({ userDetails }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/home");
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    async function searchUsers() {
      const response = await fetch(
        `http://localhost:5000/profile/search?q=${searchTerm}`
      );
      // console.log(response)
      const users = await response.json();
      // console.log(users)
      setSearchResults(users);
      setShowDropdown(true);
    }

    const timeoutId = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        searchUsers();
      } else {
        setShowDropdown(false);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]);

  // function handleSelectUser(result) {
  //   setSearchTerm(result.username);
  //   // setShowDropdown(false);
  // }
  return (
    <div className="header">
      <div className="headerLeft">
        <RedditIcon fontSize="large" />
        <span className="greddiit">Greddiit</span>
      </div>
      <div className="headerName">
        <img src={require("../images/th.jpeg")} alt="user" className="picture" />
        <span className="Naam">{userDetails.username}</span>
      </div>
      <div className="headerCenter">
        <div className="search">
          <SearchIcon fontSize="medium" style={{ marginLeft: 5 }} />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search Username"
            className="searchInput"
          />
        </div>
        <div className="searchResult">
          {showDropdown && searchResults.length > 0 && (
            <ul class="list-group">
              {searchResults.map((result) =>
                result.item.username === userDetails.username ? (
                  <></>
                ) : (
                  <SearchList result={result.item} userDetails={userDetails} />
                )
              )}
            </ul>
          )}
        </div>
      </div>

      <div className="headerRight">
        <button className="logout" onClick={handleLogout}>
          <LogoutIcon />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
