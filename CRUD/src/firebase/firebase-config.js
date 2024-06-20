// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeFQ-MReGjP9zoimJIbc1cmSs9uNF61aI",
  authDomain: "crud-app-b5979.firebaseapp.com",
  projectId: "crud-app-b5979",
  storageBucket: "crud-app-b5979.appspot.com",
  messagingSenderId: "77671284715",
  appId: "1:77671284715:web:ecc13df940280d0028e3ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const facebookProvider=new FacebookAuthProvider();
export const gitHubProvider=new GithubAuthProvider();
export const googleProvider=new GoogleAuthProvider();
export const db=getFirestore(app)
export const storage=getStorage(app)
