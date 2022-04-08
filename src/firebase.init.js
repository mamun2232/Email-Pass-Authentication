// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuLmd2BXRsccozH1k4vRinCtix7EJkiFA",
  authDomain: "email-password-auth-846a6.firebaseapp.com",
  projectId: "email-password-auth-846a6",
  storageBucket: "email-password-auth-846a6.appspot.com",
  messagingSenderId: "424022391215",
  appId: "1:424022391215:web:5bac4572590bcf50aa975a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app