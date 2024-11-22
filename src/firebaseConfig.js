import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyC1IPKAGWLokfmv6PzTx98bNMCRl4s4By8",
    authDomain: "recycle-3c3c7.firebaseapp.com",
    databaseURL: "https://recycle-3c3c7-default-rtdb.firebaseio.com",
    projectId: "recycle-3c3c7",
    storageBucket: "recycle-3c3c7.appspot.com",
    messagingSenderId: "1067702828284",
    appId: "1:1067702828284:web:ddb91971ccc426cb462b79",
    measurementId: "G-Q1Q29ZQF96"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDB = getDatabase(app);
