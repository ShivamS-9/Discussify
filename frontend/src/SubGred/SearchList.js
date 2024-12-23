import React, { useEffect, useState } from "react";
import AllPost from "./AllPosts";

const SearchList = ({ searchTerm , userDetails}) => {
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    async function searchUsers() {
      const result = await fetch(
        `http://localhost:5000/subGreddiit/search?q=${searchTerm}`
      );
      // console.log(result)
      const users = await result.json();
      // console.log(users)
      setSearchResults(users);
    }
    searchUsers();
  }, [searchTerm]);
  // console.log(searchResults)
  return (
    searchResults.length > 0 &&
    searchResults.map((result) => <AllPost post={result.item} userDetails={userDetails}/>)
  );
};

export default SearchList;
