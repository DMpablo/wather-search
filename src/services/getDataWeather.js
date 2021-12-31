import axios from "axios";

export const getDataWeather = async (search) => {

  return await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=d77975f877192c8f44f18f3a5d567136`
    )
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      return console.error("Error: ", e);
    });
};
