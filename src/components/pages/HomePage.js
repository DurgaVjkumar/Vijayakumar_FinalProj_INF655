import React, {useState, useEffect, useCallback}from 'react';
import './HomePage.css';



const HomePage = () => {
    const [search, setSearch] = useState('');
    const [movies, setMovies]=useState([]);
    const [isLoading, setisLoading] = useState(false);

    const API_KEY = "8b9550ae2a14fccb482b8829de95270f";
    const UPCOMING_MOVIES_URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=8b9550ae2a14fccb482b8829de95270f&language=en-US&page=1`;
    
    
    const BASE_URL = "https://api.themoviedb.org/3/movie";
    const IMG_BASE_URL ="https://image.tmdb.org/t/p/w92";
    

        
        
    // const fetchUpcomingMovies = useCallback(async () => {
    //     setisLoading(true);
    //     try {
    //         const response = await fetch(UPCOMING_MOVIES_URL);
    //         const data = await response.json();

    //         //for each movie get director and genre
    //         data.results.forEach(async (movie) => 
    //         {        
    //             //get director      
    //             const creditsURL = `${BASE_URL}/${movie.id}/credits?api_key=${API_KEY}&language=en-US&crew`;
    //             const crewListResponse = await fetch(creditsURL);
    //             const crewList = await crewListResponse.json();
    //             const director = crewList.crew.find( (c)=>c.job == "Director");
    //             movie.director = director.name; 
                
                
    //             //get genre
    //             const detailURL = `${BASE_URL}/${movie.id}?api_key=${API_KEY}`;
    //             const movieDetailsResponse = await fetch(detailURL);
    //             const movieDetails = await movieDetailsResponse.json();
    //             movie.genre = movieDetails.genres[0].name;
    //         });
    //         console.log(data.results);
            
    //             setMovies(data.results);
    //             setisLoading(false);
    //     } catch (error) {
    //       console.log("error");
    //     }   
    // },[]);
    
        // const fetchUpcomingMovies = async () => {
        //     setisLoading(true);
        //     try {
        //         const response = await fetch(UPCOMING_MOVIES_URL);
        //         const data = await response.json();

        //         //for each movie get director and genre
        //         data.results.forEach(async (movie) => 
        //         {        
        //             //get director      
        //             const creditsURL = `${BASE_URL}/${movie.id}/credits?api_key=${API_KEY}&language=en-US&crew`;
        //             const crewListResponse = await fetch(creditsURL);
        //             const crewList = await crewListResponse.json();
        //             const director = crewList.crew.find( (c)=>c.job == "Director");
        //             movie.director = director.name; 
                    
                    
        //             //get genre
        //             const detailURL = `${BASE_URL}/${movie.id}?api_key=${API_KEY}`;
        //             const movieDetailsResponse = await fetch(detailURL);
        //             const movieDetails = await movieDetailsResponse.json();
        //             movie.genre = movieDetails.genres[0].name;
        //         });
        //         console.log(data.results);
                
        //             setMovies(data.results);
        //             setisLoading(false);
        //     } catch (error) {
        //       console.log("error");
        //     }   
        // };
        //fetchUpcomingMovies();  
   
    // useEffect(() => {
    //     fetchUpcomingMovies();
    // }, [fetchUpcomingMovies])
    
        

    
    const queryAPI = () => { 
        setisLoading(true);
         console.log(search);
         const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1`;
        
         
        const fetchSearchResults = async () => {
            try {
              const response = await fetch(searchUrl);
              const data = await response.json();
                //console.log(data.results);
                //if(data.results[0].genre.name)
                  //  setMovies(data.results);
                   // setisLoading(false);
                   fectchDetails(data);
            } catch (error) {
              console.log("error");
            }         
        };      
        fetchSearchResults();

        const fectchDetails = async(data)=>{
            //console.log(data.results);
            //get director
             data.results.forEach(async (movie) => {               
                const creditsURL = `${BASE_URL}/${movie.id}/credits?api_key=${API_KEY}&language=en-US&crew`;

                try {
                    const crewListResponse = await fetch(creditsURL);
                    const crewList = await crewListResponse.json();
                    const director = crewList.crew.find( (c)=>c.job == "Director");
                    movie.director = director.name; 
                    
                    
                    //get genre
                    const detailURL = `${BASE_URL}/${movie.id}?api_key=${API_KEY}`;
                    const movieDetailsResponse = await fetch(detailURL);
                    const movieDetails = await movieDetailsResponse.json();
                    movie.genre = movieDetails.genres[0].name;
                    //console.log(movie.genre);
                } catch (error) {
                    console.log(error+"augh");
                }                    
            });
            console.log(data.results);
            setMovies(data.results);
            setisLoading(false);
        };
        //fectchDetails();

    };

    useEffect(() => {
      
    }, [movies])
    
    //submit event handler
    const submitHandler = (event) => {
        event.preventDefault(); //prevent default browser submission
        
        queryAPI();
        //resets the input boxes to empty
        setSearch('');
    };
  return (
    <div>
     
     <form onSubmit={submitHandler}> 
            <div >
                <label htmlFor="search">Search for a movie</label>
                <input
                    id="search"
                    type="text"
                    placeholder="movie title"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>
            <div >
                <button type='submit'>search</button>
            </div>
        </form>

        <div>
            <h2> Search result</h2>
            <ul>
                {!isLoading
                && movies.map((item)=>(
                    <li key={item.id} className="card" >
                       <img src={`${IMG_BASE_URL}${item.poster_path}`} alt="image unavailable"></img>
                       <p>Rating: {item.vote_average}</p>
                        <h3>{item.title}</h3>
                        <p>Directed by: {item.director}</p>
                        <p>Genre: {item.genre}</p>
                        <p>Release date: {item.release_date}</p>
                        <p>key: {item.id}</p>
                        <p> 
                            {item.overview}
                        </p>
                    </li>
                ))}
                {isLoading && <p>Loading...</p>}
            </ul>
        </div>
    </div>
  )
}

export default HomePage


              


             //fetch director info
          //get director info
        // const getDirector =   (items) => {
        //     items.forEach( async (item)=>
        //        { 
        //            try
        //            {
        //                 const creditsURL = `https://api.themoviedb.org/3/movie/${item.id}/credits?api_key=${API_KEY}&language=en-US&crew`;

        //                 const response = await fetch(creditsURL);

        //                 const json = await response.json();
        //                 //console.log(json);
        //                 //const directors = json.crew.filter( (c)=>c.job == "Director");
        //                 const director = json.crew.find( (c)=>c.job == "Director");
        //                 //console.log(directors.map(({name})=>name));

        //                 //add directors to each movie object
        //                 //item.directors = directors.map( ({name})=>name);
        //                 item.directors = director.name;
        //                //console.log(item.directors);
        //             }
        //             catch(error){
        //                 console.log("error", error);
        //             }
        //         }
        //     );
        //    // console.log(items.map(({item})=>item.directors));
        //    //console.log(items)
        //     //setResults(items);
        //     setDirector(director);
        // };