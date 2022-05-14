import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Header from './Header';
import Nav from './Nav';
import SearchPage from './pages/SearchPage';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useState } from 'react';
import SignOut from './SignOut';


import FavoritesList from './components/FavoritesList';




function App() {
  

  return (

    <BrowserRouter>
    <div>
        <Nav></Nav>
        <Routes>
          <Route path='/' element={<HomePage/>} /> 
          <Route path='/search' element={<SearchPage/>} /> 
          <Route path='/login' element={<SignIn/>} /> 
          <Route path='/signup' element={<SignUp/>} /> 

        </Routes>  
      </div>
    </BrowserRouter>

    // <div className="App">
    //  {/* <Header></Header> */}
    //  <Nav user={currentUser} signOutHandler={signOutHandler}></Nav>
      
    //  <section>
    //    {currentUser ? <HomePage/> : <SignIn/>}
    //  </section>
    // </div>
  );
}

export default App;
