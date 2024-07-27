// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC25ZJGNbbSO36X6gEyel-NoSwFv-Bpe5o",
  authDomain: "photofilio.firebaseapp.com",
  projectId: "photofilio",
  storageBucket: "photofilio.appspot.com",
  messagingSenderId: "802856111858",
  appId: "1:802856111858:web:a665bab487305ecc98ca6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);