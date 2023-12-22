

'use client';

// export default firebase;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArqx8AreRnecrFsq_UjKOO_mnFxJ773Vs",
  authDomain: "chethfunds.firebaseapp.com",
  projectId: "chethfunds",
  storageBucket: "chethfunds.appspot.com",
  messagingSenderId: "851022073074",
  appId: "1:851022073074:web:ed76d6e65e69c1f4bf546b",

};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase)
const firestore = getFirestore(firebase);

export { auth, firestore };