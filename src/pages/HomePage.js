import React, {useState, useEffect} from 'react'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {doc, getDocs, orderBy, query, limit} from "firebase/firestore";
import { db } from '../firebase.config';
import MovieList from '../components/MovieList';
import { collection } from 'firebase/firestore';
const HomePage = () => {
    const [currentUser, setcurrentUser] = useState();
    const [favoritesList, setfavoritesList] = useState([]);
    const [isLoading, setisLoading] = useState(false);

    const navigate = useNavigate;
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      //const uid = user.uid;
      //console.log(user.displayName);
      setcurrentUser(user);
      // ...
    } else {
      // User is signed out
      navigate("/signup");
    }
  });

 useEffect(() => {
     setisLoading(true);
    const fetchFavorites = async () =>{
        const movieListRef = collection(db, "movieList"); //fetch from db
        const q = query(movieListRef, orderBy('title'), limit(10));
        const querySnapshot = await getDocs(q);

        const favoritesList = [];
        querySnapshot.forEach((doc) => {
            return favoritesList.push({
                id: doc.id,
                data: doc.data(),
            });
        });

        setfavoritesList(favoritesList);
        setisLoading(false);
    };
    fetchFavorites();
 }, [])
 
 


return (
    <div>
        <MovieList movies={favoritesList} isLoading={isLoading}></MovieList>  
    </div>
)
}

export default HomePage

// const signOutHandler=()=>{    
//     signOut(auth).then(() => {
//       // Sign-out successful.
//       setcurrentUser();
//     }).catch((error) => {
//       // An error happened.
//     });
//   };
