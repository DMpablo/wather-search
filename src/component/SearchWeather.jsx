import React, { useState, useEffect } from "react";
import { getDataWeather } from "../services/getDataWeather";
import View from "./View";

export const SearchWeather = () => {
  const [search, setSearch] = useState("buenos aires, caseros");
  const [data, setData] = useState();

  useEffect(() => {
    getDataWeather(search).then((e) => {
      setData(e);
    });
  }, [search]);

  return <View data={data} setSearch={setSearch} />;
};
