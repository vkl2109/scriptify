// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAb1qEYj_5SAigQpQCaUwcJC0motfFLXDE",
  authDomain: "scriptify-with-friends.firebaseapp.com",
  projectId: "scriptify-with-friends",
  storageBucket: "scriptify-with-friends.appspot.com",
  messagingSenderId: "776570722987",
  appId: "1:776570722987:web:72f43d9b5beb9fb0bbf5ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {
    db
}