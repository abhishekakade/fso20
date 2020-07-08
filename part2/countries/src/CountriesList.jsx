import React, { useState, useEffect } from "react";
import { CountryDetails } from "./CountryDetails";

const CountriesList = ({ searchText, countries }) => {
  const [country, setCountry] = useState([]);
  const [displaySelectedCountry, setDisplaySelectedCountry] = useState(false);

  useEffect(() => {
    // remove country and display when searchText changes
    setCountry([]);
    setDisplaySelectedCountry(false);
  }, [searchText]);

  console.log("state", country);

  const filterCountries = (searchTerm) => {
    // if name matches, return contact with that name OR if number matches, return contact with that number
    let filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchTerm.trim())
        ? country.name.toLowerCase().includes(searchTerm.trim())
        : null
    );

    // console.log("filteredCountries", filteredCountries);

    if (searchTerm.trim() === "") {
      return <p>Start typing to see results...</p>;
    } else if (filteredCountries.length > 10) {
      return <p>Too many matches! Please specify another filter...</p>;
    } else if (filteredCountries.length === 1) {
      console.log("filteredCountries", filteredCountries);
      return <CountryDetails country={filteredCountries[0]} />;
    } else
      return filteredCountries.map((country) => (
        <li key={country.name}>
          {country.name}{" "}
          <button
            id="show-details-btn"
            onClick={() => {
              setCountry(country);
              setDisplaySelectedCountry(true);
            }}
          >
            Show Details
          </button>
        </li>
      ));
  };

  return (
    <>
      <ul id="countries-list">{filterCountries(searchText)}</ul>
      {displaySelectedCountry && <CountryDetails country={country} />}
    </>
  );
};

export default CountriesList;
