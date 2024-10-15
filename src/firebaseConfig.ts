import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCrzbfxLRi74YIQneCvx_zPMffCgo4bRrs",
  authDomain: "wishlist-4b84c.firebaseapp.com",
  databaseURL:
    "https://wishlist-4b84c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wishlist-4b84c",
  storageBucket: "wishlist-4b84c.appspot.com",
  messagingSenderId: "610347453159",
  appId: "1:610347453159:web:622ee9e277368fa8ee3042",
  measurementId: "G-EQEFGYVYJZ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage();
