import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateMovie from "./Movies/Update";
import Movie from "./Movies/Movie";
import axios from "axios";

import { BASE_URL } from "./constants";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get(`${BASE_URL}/api/movies`)
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const updateMovie = movie => {
    return axios
      .put(`${BASE_URL}/api/movies/${movie.id}`, movie)
      .then(res => {
        const updatedMovie = res.data;
        setMovieList(
          movieList.map(m => (m.id === updatedMovie.id ? updatedMovie : m))
        );
      })
      .catch(err => console.log(err.response));
  };

  const deleteMovie = id => {
    return axios
      .delete(`${BASE_URL}/api/movies/${id}`)
      .then(res => {
        const deletedId = res.data;
        setMovieList(movieList.filter(m => m.id !== deletedId));
      })
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} deleteMovie={deleteMovie} />
      </Route>

      <Route path="/update-movie/:id">
        <UpdateMovie {...{ movieList, updateMovie }} />
      </Route>
    </>
  );
};

export default App;
