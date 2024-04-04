// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARtiAA3X3Dj-tGyR25HFluMAp0boC8kqg",
  authDomain: "restaurante-71dc8.firebaseapp.com",
  projectId: "restaurante-71dc8",
  storageBucket: "restaurante-71dc8.appspot.com",
  messagingSenderId: "907414517377",
  appId: "1:907414517377:web:77b63492dda7cb0e4abf80",
  measurementId: "G-BTD8ZHGQ0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default firebaseConfig;