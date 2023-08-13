
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from "firebase/auth";

 const firebaseConfig = {
  apiKey: "AIzaSyCEwKOTElJgPpN15qk-unz1BM2meuHVrhg",
  authDomain: "siglo-web-app.firebaseapp.com",
  projectId: "siglo-web-app",
  storageBucket: "siglo-web-app.appspot.com",
  messagingSenderId: "575129463076",
  appId: "1:575129463076:web:78156f3c893af5aedf2bb1",
  measurementId: "G-ND837Z3CQX"
};

// Check if the code is running on the client-side

  // Initialize Firebase on the client-side
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };