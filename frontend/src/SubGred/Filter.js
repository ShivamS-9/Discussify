// import axios from "axios";
import React from "react";
const Filter = ({handleFilter, tags, setTags}) => {
  
  // console.log(tags.tags)
  
  return (
    <div className="Filter">
      <form onSubmit={handleFilter}>
        <input
          className="filter_form"
          name="tags"
          variant="outlined"
          type="tags"
          label="Tags"
          autoFocus
          value={tags.tags}
          onChange={(e) => setTags(e.target.value.split(", "))}
          placeholder="Tags (Seperated by ',')"
        />
        <button className="FilterButton" type="submit">
          Apply
        </button>
      </form>
    </div>
  );
};

export default Filter;
