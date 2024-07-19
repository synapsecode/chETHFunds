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
  apiKey: "AIzaSyDQPUTjBAFA_5TVGJgbfli4kCwcbqFeM0k",
  authDomain: "chethfunds-9cb76.firebaseapp.com",
  projectId: "chethfunds-9cb76",
  storageBucket: "chethfunds-9cb76.appspot.com",
  messagingSenderId: "725733902625",
  appId: "1:725733902625:web:aa3d5b7997fd2e8ef65660"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase)
const firestore = getFirestore(firebase);

export { auth, firestore };