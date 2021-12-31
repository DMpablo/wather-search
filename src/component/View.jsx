import React, { useState } from "react";
import { Loading } from "./Loading";
import "./view.css";

const View = ({ data, setSearch }) => {
  const [input, setInput] = useState("");

  let emoji = "fa-cloud";
  // console.log(data.weather);

  if (data !== undefined) {
    data.weather[0].main === "Clouds"
      ? (emoji = "fa-cloud")
      : data.weather[0].main === "Thunderstorm"
      ? (emoji = "fa-bolt")
      : data.weather[0].main === "Drizzle"
      ? (emoji = "fa-cloud-rain")
      : data.weather[0].main === "Rain"
      ? (emoji = "fa-cloud-shower-heavy")
      : data.weather[0].main === "Snow"
      ? (emoji = "fa-Snow-flake")
      : data.weather[0].main === "Mist"
      ? (emoji = "fa-smog")
      : data.weather[0].main === "Clear"
      ? (emoji = "fa-sun")
      : (emoji = "fa-smog");
  } else {
    return <Loading />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
  };

  let temp = 0;
  let temp_min = 0;
  let temp_max = 0;

  if (data !== undefined) {
    temp = (data.main.temp - 273.15).toFixed(2);
    temp_min = (data.main.temp_min - 273.15).toFixed(2);
    temp_max = (data.main.temp_max - 273.15).toFixed(2);
  }

  // Date
  let d = new Date();
  let day = d.getDate();
  let month = d.getMonth();
  let year = d.getFullYear();

  // Time
  let hour = d.getHours();
  let minute = d.getMinutes();
  //let second = d.getSeconds();
  const urlBackground = `https://source.unsplash.com/1400x900/?${data.weather[0].main}`;

  return (
    <div className="container-todo">
      <title>
        {data.name} {"   "} {temp} °C
      </title>
      <nav>
        {" "}
        <h2>Search weather</h2>
        <h3>
          {hour} : {minute}
        </h3>
        <h3 className="card-text lead">
          {day} | {month} | {year}
        </h3>
      </nav>
      <div className="">
        <div
          className="card-img row"
          style={{ backgroundImage: `url(${urlBackground})` }}
        >
          {data === undefined ? (
            " Error en la busqueda"
          ) : (
            <div className="card-data col-md mx-4">
              <i className={`fas ${emoji} fa-4x`}></i>
              <h2 className=""> {temp} °C</h2>
              <p className="lead">
                {temp_min} °C | {temp_max} °C
              </p>
              {data.weather.map((x) => (
                <p className="lead mb-0" key={x.id}>
                  {" "}
                  {x.main}{" "}
                </p>
              ))}
            </div>
          )}

          <div className="card-info col-md mx-4">
            <h3 className="card-title">{data.name}</h3>

            <form onSubmit={handleSubmit}>
              <div className="input-group mb-4 w-100">
                <input
                  type="Search"
                  className="form-control"
                  placeholder="Buscar Ciudad"
                  aria-label="Buscar Ciudad"
                  aria-describedby="basic-addon2"
                  name="search"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="input-group-text"
                  id="basic-addon2"
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
