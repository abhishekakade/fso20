import React from "react";

const Search = ({ searchText, handleSearchText }) => {
  return (
    <>
      <h2>Search</h2>
      <input
        type="search"
        value={searchText}
        onChange={handleSearchText}
        placeholder="Search for names or numbers..."
        aria-label="Search for contacts with their names or numbers"
      />
    </>
  );
};

export default Search;
