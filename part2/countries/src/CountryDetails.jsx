import React, { useEffect, useState } from "react";
import axios from "axios";

export const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState({});
  const [noFetchingError, setNoFetchingError] = useState(false);

  // weatherstack api key required
  const WEATHERSTACK_API_KEY = process.env.REACT_APP_WEATHERSTACK_API_KEY;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${WEATHERSTACK_API_KEY}&query=${country.capital}`
      )
      .then((res) => {
        setWeather(res.data);
        setNoFetchingError(true);
      })
      .catch((err) => {
        setNoFetchingError(false);
        console.error(err);
      });
  }, [country, WEATHERSTACK_API_KEY]);

  console.log("country", country);
  console.log("weather", weather);

  return (
    <div id="country-details">
      <h3>{country.name}</h3>
      <img
        id="country-flag"
        src={country.flag}
        alt={country.name}
        width="200px"
        height="auto"
      />
      <p>
        <strong>Capital: </strong>
        {country.capital}
      </p>
      <p style={{ margin: "0.25rem auto" }}>
        <strong>Population: </strong>
        {country.population}
      </p>
      <p style={{ margin: "0.25rem auto" }}>
        <strong>Languages Spoken: </strong>
      </p>
      <ul id="languages-list">
        {country.languages?.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      {noFetchingError && weather?.current && (
        <div>
          <h4>Weather in {country.capital}</h4>
          <img
            id="weather-icon"
            src={weather.current?.weather_icons[0]}
            alt={weather.current?.weather_descriptions[0]}
          />
          <p>
            <strong>{weather.current?.weather_descriptions[0]}</strong>
          </p>
          <p>Temperature: {weather.current?.temperature}°C</p>
          <p>Humidity: {weather.current?.humidity}%</p>
          <p>
            Wind: {weather.current?.wind_speed} km/h from{" "}
            {weather.current?.wind_dir}
          </p>
          <p>Cloud: {weather.current?.cloudcover}%</p>
          <p>Pressure: {weather.current?.pressure} mb</p>
        </div>
      )}
    </div>
  );
};
