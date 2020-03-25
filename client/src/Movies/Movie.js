import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, getMovieList, history }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const routeToEditForm = e => {
    e.preventDefault();
    history.push(`/update-movie/${movie.id}`);
  };

  const deleteMovie = e => {
    e.preventDefault();
    axios.delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        getMovieList(res.data);
        history.push('/movies');
      })
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>

      <div className='update-button' onClick={routeToEditForm}>
        Update
      </div>

      <div className='delete-button' onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
