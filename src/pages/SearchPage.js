import React, {useState, useEffect, useCallback}from 'react';
import MovieForm from '../components/MovieForm';
import MovieList from '../components/MovieList';
import FavoritesList from '../components/FavoritesList';
import './SearchPage.css';



const SearchPage = () => {
    
    const [movies, setMovies]=useState([]);
    const [isLoading, setisLoading] = useState(false);

    const API_KEY = "8b9550ae2a14fccb482b8829de95270f";
    //const UPCOMING_MOVIES_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=8b9550ae2a14fccb482b8829de95270f&language=en-US&page=1`;
    
    
    const BASE_URL = "https://api.themoviedb.org/3/movie";
    const IMG_BASE_URL ="https://image.tmdb.org/t/p/w92";
    

    
    const searchMovieHandler = (search) => { 
        setisLoading(true);
        //isSearching(true);
         console.log(search);
         const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1`;
        
         
        const fetchSearchResults = async () => {
            try {
              const response = await fetch(searchUrl);
              const data = await response.json();
                   fectchDetails(data);
            } catch (error) {
              console.log("error");
            }         
        };      
        fetchSearchResults();

        const fectchDetails = async(data)=>{
            
            //get director and genre for each movie
             for (const movie of data.results) {                                
                    const creditsURL = `${BASE_URL}/${movie.id}/credits?api_key=${API_KEY}&language=en-US&crew`;
    
                    try {
                        const crewListResponse = await fetch(creditsURL);
                        const crewList = await crewListResponse.json();
                        const director = crewList.crew.find( (c)=>c.job == "Director");
                        movie.director = director.name; 
                        
                        
                        //get genre
                        const detailURL = `${BASE_URL}/${movie.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`;
                        const movieDetailsResponse = await fetch(detailURL);
                        const movieDetails = await movieDetailsResponse.json();
                        movie.genre = movieDetails.genres[0].name;
                        movie.trailer = movieDetails.videos.results.find((v)=>(v.type == "Trailer" && v.site == "YouTube" ));
                        //movie.key = movie.trailer.key;
                        //console.log(movie.trailer);
                    } catch (error) {
                        console.log(error+"augh");
                    }  
            }
           
            console.log(data.results);
            setMovies(data.results);
            //setMovies(transformeddata);
            setisLoading(false);
        };
    };

  return (
    <div>
        <div className='search-div'>
            <MovieForm onSearchEnter={searchMovieHandler}></MovieForm>
        </div>
        <section>
            <MovieList movies={movies} isLoading={isLoading}></MovieList>               
        </section>
    </div>
  )
}

export default SearchPage