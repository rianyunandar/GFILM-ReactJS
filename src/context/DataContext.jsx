import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DataProvider = (props) => {
  const [movies, setMovies] = useState(null);
  const [games, setGames] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      const result = await axios.get(
        `https://backendexample.sanbersy.com/api/data-movie`
      );
      setMovies(result.data);
    };
    if (movies === null) {
      fetchMovieData();
    }
  }, [movies]);

 

  useEffect(() => {
    const fetchGamesData = async () => {
      const result = await axios.get(
        `https://backendexample.sanbersy.com/api/data-game`
      );
      setGames(result.data);
    };
    if (games === null) {
      fetchGamesData();
    }
  }, [games]);

  return (
    <DataContext.Provider
      value={{
        movies,
        setMovies,
        games,
        setGames,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export const DataContext = createContext();