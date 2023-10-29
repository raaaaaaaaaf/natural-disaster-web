// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdysHVIwpiF6RLxfRNZRuRdNTXiyBZrGY",
  authDomain: "natural-disaster-web-based.firebaseapp.com",
  projectId: "natural-disaster-web-based",
  storageBucket: "natural-disaster-web-based.appspot.com",
  messagingSenderId: "173370183201",
  appId: "1:173370183201:web:b8222294421e4abf415d60",
  measurementId: "G-N2W80VRG9C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)