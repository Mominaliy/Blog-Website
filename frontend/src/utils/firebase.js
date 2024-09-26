import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCmdfDNtfUTaYO9q9lkmRMZKJTqqE6ZON0",
  authDomain: "blog-website-acb59.firebaseapp.com",
  projectId: "blog-website-acb59",
  storageBucket: "blog-website-acb59.appspot.com",
  messagingSenderId: "644658192925",
  appId: "1:644658192925:web:fe9035c51220d8955f9cf4",
  measurementId: "G-H30FZ1EYTQ",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
