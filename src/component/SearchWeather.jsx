import React, { useState, useEffect } from "react";
import axios from "axios";

export const SearchWeather = () => {
  const [search, setSearch] = useState("buenos aires, caseros");
  const [data, setData] = useState();
  const [error, setError] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const getData = async () => {
      await axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=d77975f877192c8f44f18f3a5d567136`
        )
        .then((response) => setData(response.data))
        .catch((error) => {
          setError({ errorMessage: error.message });
          console.error("There was an error!", error);
        });
    };
    getData();
  }, [search]);

  let emoji = "fa-cloud";

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
    return (
      <div className="d-flex justify-content-center">
      <div className="spinner-border mt-5" style={{width:"10rem", height:"10rem" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
    );
  }

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card text-white text-center border-0">
              <img
                src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`}
                className="card-img"
                alt="..."
              />
              <div className="card-img-overlay">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-4 w-75 mx-auto">
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
                {data === undefined ? (
                  " Error en la busqueda"
                ) : (
                  <div className="bg-dark bg-opacity-50 py-3">
                    <p>
                      {hour} : {minute}
                    </p>
                    <h2 className="card-title">{data.name}</h2>
                    <h3 className="card-text lead">
                      {day} | {month} | {year}
                    </h3>{" "}
                    <hr />
                    <i className={`fas ${emoji} fa-4x`}></i>
                    <h2 className="mb-5"> {temp} °C</h2>
                    {data.weather.map((x) => (
                      <p className="lead mb-0" key={x.id}>
                        {" "}
                        {x.main}{" "}
                      </p>
                    ))}
                    <p className="lead">
                      {temp_min} °C | {temp_max} °C
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
