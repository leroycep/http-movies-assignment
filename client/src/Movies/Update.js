import React, { useState, useEffect } from "react";
import { Route, useParams, useHistory } from "react-router-dom";
import axios from "axios";

import { BASE_URL } from "../constants";

const Update = ({ movieList, ...props }) => {
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const history = useHistory();

  useEffect(() => {
    let id = undefined;
    try {
      id = parseInt(params.id);
    } catch (e) {
      console.log("failed to parse param id: ", e);
      return;
    }
    const movie = movieList.find(movie => movie.id === id);
    if (movie !== undefined) {
      setMovie(JSON.parse(JSON.stringify(movie)));
    }
  }, [params.id, movieList]);

  const updateMovie = ev => {
    ev.preventDefault();
    props.updateMovie(movie).then(() => {
      history.push("/");
      setMovie(null);
    });
  };

  if (movie === null) {
    return <div>The movie could not be found.</div>;
  }

  const handleMovieChange = ev => {
    ev.preventDefault();
    setMovie({
      ...movie,
      [ev.target.name]: ev.target.value
    });
  };

  const handleStarChange = ev => {
    ev.preventDefault();
    const targetIdx = parseInt(ev.target.name);
    setMovie({
      ...movie,
      stars: movie.stars.map((star, idx) =>
        idx === targetIdx ? ev.target.value : star
      )
    });
  };

  const newStar = ev => {
    setMovie({
      ...movie,
      stars: [...movie.stars, ""]
    });
  };

  const deleteStar = idxToDelete => ev => {
    setMovie({
      ...movie,
      stars: movie.stars.filter((_s, idx) => idx !== idxToDelete)
    });
  };

  return (
    <form onSubmit={updateMovie}>
      <input
        type="text"
        name="title"
        value={movie.title}
        onChange={handleMovieChange}
      />
      <input
        type="text"
        name="director"
        value={movie.director}
        onChange={handleMovieChange}
      />
      <input
        type="text"
        name="metascore"
        value={movie.metascore}
        onChange={handleMovieChange}
      />
      <div>
        {movie.stars.map((star, idx) => {
          return (
            <div key={idx}>
              <input name={idx} onChange={handleStarChange} value={star} />
              <button type="button" onClick={deleteStar(idx)}>
                Delete
              </button>
            </div>
          );
        })}
        <button type="button" onClick={newStar}>
          New Star
        </button>
      </div>
      <button type="submit">Update Movie</button>
    </form>
  );
};

export default Update;
