import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; 
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAjhCpmRPI30PQ36QGBrqM0-nWTav0syUA",
  authDomain: "quantum-quest.firebaseapp.com",
  projectId: "quantum-quest",
  storageBucket: "quantum-quest.appspot.com",
  messagingSenderId: "50231955337",
  appId: "1:50231955337:web:97abc860723a6381d19b58",
  databaseURL: "https://quantum-quest-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };