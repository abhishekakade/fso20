import React from "react";

const Search = ({ searchText, handleSearchText }) => {
  return (
    <>
      <h2>Search</h2>
      <input
        type="search"
        value={searchText}
        onChange={handleSearchText}
        placeholder="Search for countries..."
        aria-label="Search for countries"
      />
    </>
  );
};

export default Search;
