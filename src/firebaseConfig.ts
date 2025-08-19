// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs8-taOp2s5TSXLtlCFJbyG9EtdxkDl_c",
  authDomain: "edulink-b524c.firebaseapp.com",
  projectId: "edulink-b524c",
  storageBucket: "edulink-b524c.firebasestorage.app",
  messagingSenderId: "384673270216",
  appId: "1:384673270216:web:9d3652e741232bde1c98fd",
  measurementId: "G-8D8NFZVW5Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);