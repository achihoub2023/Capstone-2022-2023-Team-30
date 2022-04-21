import React from "react";

function SearchBar() {
  return (
    <div className="SearchBar">
      <input type="text" placeholder="Type a stock name..." />
      <button>
        <img src="/SearchIcon.svg" alt="search" />
      </button>
    </div>
  );
}

export default SearchBar;
