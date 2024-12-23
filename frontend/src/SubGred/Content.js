import React, { useState } from "react";
import Navbar from "../profile/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import AllPostsList from "./AllPostsList";
import SearchList from "./SearchList";
import FilterListIcon from "@mui/icons-material/FilterList";
import SortIcon from "@mui/icons-material/Sort";
import Filter from "./Filter";
import Sort from "./Sort";
import axios from "axios";
const Content = ({ posts, userDetails }) => {
  // console.log(posts)
  const [tags, setTags] = useState([]);
  const [filterToggle, setFilterToggle] = useState(false);
  const [sortToggle, setSortToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterData, setFilterData] = useState("");
  const [sortData, setSortData] = useState('');
  const [searchDisabled, setSearchDisabled] = useState(false);
  const [nameascToggle, setNameascToggle] = useState(false);
  const [namedesToggle, setNamedesToggle] = useState(false);
  const [folascToggle, setFolascToggle] = useState(false);
  const [dateToggle, setDateToggle] = useState(false);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handlefilter = () => {
    setSortToggle(false);
    setFilterToggle(!filterToggle);
    setFilterData(posts);
    if (filterToggle === true) setSearchDisabled(false);
    else setSearchDisabled(true);
  };
  const handlesort = () => {
    setSortToggle(!sortToggle);
    setFilterToggle(false);
    setSortData(posts);
    if (sortToggle === true) setSearchDisabled(false);
    else setSearchDisabled(true);
  };
  const handleFilter = async (e) => {
    e.preventDefault();
    const result = await axios.post(
      "http://localhost:5000/subGreddiit/filter",
      tags
    );
    // console.log(result.data)
    setFilterData(result.data);
  };
  const handleSort = async (criteria) => {
    if (criteria === "name=asc") {
      setNamedesToggle(false)
      setNameascToggle(!nameascToggle);
      if (nameascToggle === true) {
        criteria = '';
      }
    } else if (criteria === "name=desc") {
      setNameascToggle(false)
      setNamedesToggle(!namedesToggle);
      if (namedesToggle === true) {
        criteria = '';
      }
    } else if (criteria === "num=desc") {
      setFolascToggle(!folascToggle);
      if (folascToggle === true) {
        criteria = '';
      }
    } else if (criteria === "date=desc") {
      setDateToggle(!dateToggle);
      if (dateToggle === true) {
        criteria = '';
      }
    }
    const response = await fetch(
      `http://localhost:5000/subGreddiit/sort?${criteria}`
    );
    const data = await response.json();
    console.log(data);
    setSortData(data);
  };
  return (
    <div className="content">
      <div class="container">
        <Navbar />

        <div className="search">
          <SearchIcon fontSize="medium" style={{ marginLeft: 5 }} />
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={
              !searchDisabled
                ? "Search Sub Greddiit By Name"
                : "Search Disabled"
            }
            className="searchInput"
            disabled={searchDisabled}
          />

          <div className="filter" type="button" onClick={handlefilter}>
            Filter
            <FilterListIcon style={{ marginRight: "30px" }} />
          </div>
          <div className="sort" type="button" onClick={handlesort}>
            Sort
            <SortIcon />
          </div>
        </div>
        {filterToggle === true && (
          <Filter handleFilter={handleFilter} tags={tags} setTags={setTags} />
        )}
        {sortToggle === true && (
          <Sort
            handleSort={handleSort}
            nameascToggle={nameascToggle}
            namedesToggle={namedesToggle}
            folascToggle={folascToggle}
            dateToggle={dateToggle}
          />
        )}
        <div>
          {sortToggle === true ? (
            <AllPostsList  posts={sortData} userDetails={userDetails} />
          ) : filterToggle === true ? (
            <AllPostsList posts={filterData} userDetails={userDetails} />
          ) : searchTerm.trim() === "" ? (
            <AllPostsList posts={posts} userDetails={userDetails} />
          ) : (
            <SearchList searchTerm={searchTerm} userDetails={userDetails} />
          )}
        </div>
      </div>
    </div>
    // <div>fgs</div>
  );
};

export default Content;
