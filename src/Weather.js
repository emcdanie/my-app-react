import React, { useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("null");
  const [message, setMessage] = useState("");

  function showWeather(response) {
    setMessage(
      <ul>
        <li>Temperature: {Math.round(response.data.main.temp)}°C</li>
        <li>Description: {response.data.weather[0].description}</li>
        <li>Humidity: {response.data.main.humidity}%</li>
        <li>Wind: {response.data.wind.speed}km/h</li>
        <li>
          <img
            src={`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
            alt={response.data.weather[0].description}
          />
        </li>
      </ul>
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "717c122d03da5b502d476732c8793a31";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(showWeather);
    return (
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    );
  }

  function changeCity(event) {
    setCity(event.target.value);
  }
  function changeTemperature(event) {
    setTemperature(event.target.value);
  }

  return (
    <div className="WeatherSearch">
      <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Type a city" onChange={changeCity} />
        <input type="submit" value="Search" onChange={changeTemperature} />
      </form>
      <h2>{message}</h2>
    </div>
  );
}
