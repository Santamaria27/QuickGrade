import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from '@firebase/firestore'
import { getStorage } from 'firebase/storage'

// add firebaseConfig here.
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
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
