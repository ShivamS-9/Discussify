import React from "react";

const Sort = ({
  handleSort,
  nameascToggle,
  namedesToggle,
  folascToggle,
  dateToggle,
}) => {
  return (
    <div className="Filter">
      <button
        className={!nameascToggle ? "SortButton" : "ToggleSortB"}
        onClick={() => handleSort("name=asc")}
      >
        Name (Ascending)
      </button>
      <button
        className={!namedesToggle ? "SortButton" : "ToggleSortB"}
        onClick={() => handleSort("name=desc")}
      >
        Name (Descending)
      </button>
      <button
        className={!folascToggle ? "SortButton" : "ToggleSortB"}
        onClick={() => handleSort("num=desc")}
      >
        Users (Descending)
      </button>
      <button
        className={!dateToggle ? "SortButton" : "ToggleSortB"}
        onClick={() => handleSort("date=desc")}
      >
        Creation Date (New First)
      </button>
    </div>
  );
};

export default Sort;
