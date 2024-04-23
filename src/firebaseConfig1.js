import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

/*const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };*/

//firebaseconfig here
const firebaseConfig = {
  apiKey: "AIzaSyBQBDMos_pWfkAPf2hZBUbk77hqRQi1kaU",
  authDomain: "gradeease-57107.firebaseapp.com",
  projectId: "gradeease-57107",
  storageBucket: "gradeease-57107.appspot.com",
  messagingSenderId: "778160352595",
  appId: "1:778160352595:web:94a9ee93164131a242c5a6",
  measurementId: "G-F70FM48GS2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);