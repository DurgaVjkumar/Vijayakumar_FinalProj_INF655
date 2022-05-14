import React from 'react'
import "./MovieItem.css";

const MovieItem = (props) => {
  const IMG_BASE_URL ="https://image.tmdb.org/t/p/w92";
  return (
    <div className='movie-item'>
      <li id={props.movie.id}>
        <div className='movie-img-div'>
            <img src={`${IMG_BASE_URL}${props.movie.poster_path}`} alt="image unavailable"></img>
            <p>Rating: {props.movie.vote_average}</p>
        </div>
        <div className='movie-title'>
                <h3 >{props.movie.title}</h3>
                <p>
                    Directed by: {props.movie.director && "unknown" }
                </p>
        </div>
        <div>
        
              {props.movie.trailer != undefined 
                  && <p>Watch trailer on <a href= {`https://www.youtube.com/watch?v=${props.movie.trailer.key}`}>YouTube</a> </p> }

              {props.movie.trailer == undefined
                  && <p>Trailer unavailable</p>}
              <p>Genre: {props.movie.genre}</p>
              <p>Release date: {props.movie.release_date}</p>
              <p>key: {props.movie.id}</p>
              <p> 
                  {props.movie.overview}
              </p>
                
        </div>
        
      </li>


    </div>
  )
}

export default MovieItem