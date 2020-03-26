import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

const MovieForm = props => {
    
    const history = useHistory();
    const { id } = useParams();

    const [movieUpdate, setMovieUpdate] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    });

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

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movieUpdate)
            .then(res => {
                console.log("Handle Submit", res.data);
                setMovieUpdate({
                    id: '',
                    title: '',
                    director: '',
                    metascore: '',
                    stars: []
                });
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
                    onChange={changeHandler}
                    placeholder="Stars"
                    value={movieUpdate.stars}
                />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default MovieForm;