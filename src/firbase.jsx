// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import authentication

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJHFrvfa1rY2xtCaDikclb4Ksiku55y1U",
  authDomain: "ryoko-8fc7a.firebaseapp.com",
  projectId: "ryoko-8fc7a",
  storageBucket: "ryoko-8fc7a.appspot.com",
  messagingSenderId: "26319796940",
  appId: "1:26319796940:web:d0bc356d5f2309adeca069",
  measurementId: "G-JV2LJ73WNS" // Keep this if you're using analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Auth

// Export the auth object for use in your app
export { auth };
