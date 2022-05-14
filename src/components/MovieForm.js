import React, {useState, useEffect, useCallback}from 'react';
import './MovieForm.css';
const MovieForm = (props) => {
    const [search, setSearch] = useState('');

//submit event handler
const submitHandler = (event) => {
    event.preventDefault(); //prevent default browser submission
    
    props.onSearchEnter(search); //seach string is handled by parent component
    //resets the input boxes to empty
    setSearch('');
};

  return (
    <form onSubmit={submitHandler}> 
    <div className='search-form' >
        <div className='search-form' >
            <label htmlFor="search">Search for a movie</label>
            <input
                id="search"
                type="text"
                placeholder="movie title"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
        <div className='search-btn-div'>
            <button type='submit'>search</button>
        </div>
    </div>
    </form>
  )
}

export default MovieForm