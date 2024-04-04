// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC86w6nDNwEC7wTQjCb_ASUHxMm7B3-aAI",
  authDomain: "iglesiacristianaesperanzade.firebaseapp.com",
  projectId: "iglesiacristianaesperanzade",
  storageBucket: "iglesiacristianaesperanzade.appspot.com",
  messagingSenderId: "558478228401",
  appId: "1:558478228401:web:9ad7398dbd78cf14a3db90",
  measurementId: "G-MSQNJBZFKX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(analytics)
export default firebaseConfig;
