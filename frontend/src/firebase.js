import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCenwqPBTCel-1Pyo8Zp7TgdnoyymHbWAU",
  authDomain: "vehicle-vibration.firebaseapp.com",
  projectId: "vehicle-vibration",
  storageBucket: "vehicle-vibration.firebasestorage.app",
  messagingSenderId: "395418416937",
  appId: "1:395418416937:web:4abf08a159ae9dbdc2e938"
};

const app = initializeApp(firebaseConfig);

export default app;
