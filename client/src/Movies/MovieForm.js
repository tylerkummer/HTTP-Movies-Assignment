import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const MovieForm = props => {

    const [movieUpdate, setMovieUpdate] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    });

    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovieUpdate(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const changeHandler = e => {
        setMovieUpdate({
            ...movieUpdate,
            [e.target.name]: e.target.value
        });
    }

    const changeHandlerArray = e => {
        setMovieUpdate({
            ...movieUpdate,
            stars: [...e.target.value.split(",")]
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movieUpdate)
            .then(() => {
                history.push('/');
            })
            .catch(err => console.log(err));
    }


    return(
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="Title"
                    value={movieUpdate.title}
                />
                <input 
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="Director"
                    value={movieUpdate.director}
                />
                <input 
                    type="text"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="Metascore"
                    value={movieUpdate.metascore}
                />
                <input 
                    type="text"
                    name="stars"
                    onChange={changeHandlerArray}
                    placeholder="Stars"
                    value={movieUpdate.stars}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default MovieForm;