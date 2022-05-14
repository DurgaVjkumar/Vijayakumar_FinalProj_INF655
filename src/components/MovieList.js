import React from 'react'
import MovieItem from './MovieItem'

const MovieList = (props) => {
    
  return (
    <ul>
        {!props.isLoading && props.movies.length === 0 && <p>No movies found</p> }
        {!props.isLoading && props.movies.length > 0
        && props.movies.map((movie)=>(
            <MovieItem movie={movie}></MovieItem>
        ))}
        {props.isLoading && <p>Loading...</p>}
    </ul>
  )
}

export default MovieList