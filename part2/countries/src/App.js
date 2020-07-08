import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Search from "./Search";
import CountriesList from "./CountriesList";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");

  const handleSearchText = (event) => {
    // console.log(event.target.value);
    setSearchText(event.target.value.toLowerCase());
  };

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  // console.log(countries);

  return (
    <div className="App">
      <h1>Countries Info</h1>
      <Search searchText={searchText} handleSearchText={handleSearchText} />
      <CountriesList searchText={searchText} countries={countries} />
    </div>
  );
}

export default App;
