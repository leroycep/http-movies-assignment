import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouteMatch, Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

import { BASE_URL } from "../constants";

function Movie({ addToSavedList, deleteMovie }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`${BASE_URL}/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const handleDelete = () => {
    deleteMovie(match.params.id).then(() => {
      history.push("/");
    });
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div>
        <button className="save-button" onClick={saveMovie}>
          Save
        </button>
        <Link to={`/update-movie/${match.params.id}`}>Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default Movie;
