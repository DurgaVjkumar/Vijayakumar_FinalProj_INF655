// Import the functions you need from the SDKs you need
import{ getFirestore} from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7FpUfiX_AUx5meVRFcytn-xjzlI0q-WA",
  authDomain: "test-movie-app-c119c.firebaseapp.com",
  projectId: "test-movie-app-c119c",
  storageBucket: "test-movie-app-c119c.appspot.com",
  messagingSenderId: "575291906805",
  appId: "1:575291906805:web:c270370f607b5d566743bc"
};

// Creates and initializes a FirebaseApp instance
const firebaseApp = initializeApp(firebaseConfig);

//returns the existing Firestore instance that is associated with the provided FirebaseApp. 
export const db = getFirestore();