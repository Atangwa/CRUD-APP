import React from 'react';
import './weather.css';
// import search_icon from ''

const WeatherApp = () => {
  const search = async () => {
    var element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.weatherbit.io/v2.0/current?city=${element[0].value}&key=275ff81cf75b41a18c2709550b55afb6&include=minutely`;
    let response = await fetch(url);
    let data = await response.json();

    var humidity = document.getElementsByClassName("humidity");
    var wind = document.getElementsByClassName("windspeed");
    var temperature = document.getElementsByClassName("Temperature");
    var location = document.getElementsByClassName("location");

    humidity[0].innerHTML = data.data[0].rh;
    wind[0].innerHTML = data.data[0].wind_spd;
    temperature[0].innerHTML = data.data[0].temp;
    location[0].innerHTML = data.data[0].city_name;
    console.log(`Temperature: ${data.data[0].temp}°C`);
  };

  return (
    <div className="container">
      <div className="top-bar" onClick={search}>
        <input type="text" className="cityInput" placeholder="search" />
        <button onClick={search}>Go</button>
        {/* <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="" />
        </div> */}
      </div>
      <div className="loca">
        <div className="locat">Location:</div>
        <div className="location">Buea</div>
      </div>
      <div className="loca">
        <div className="winds">Windspeed:</div>
        <div className="windspeed">18</div>
        <div className="windunit">m/s</div>
      </div>
      <div className="loca">
        <div className="temp">Temperature:</div>
        <div className="Temperature">21</div>
        <div className="tempunit">°C</div>
      </div>
      <div className="loca">
        <div className="humid">Humidity:</div>
        <div className="humidity">67</div>
        <div className="humidityunit">%</div>
      </div>
    </div>
  );
};

export default WeatherApp;
