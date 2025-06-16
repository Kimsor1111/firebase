// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAYUOaH4732oSTue8rEq4KhW4FuHEmptJ4",
  authDomain: "esp8266-dht11-oled-led.firebaseapp.com",
  databaseURL:
    "https://esp8266-dht11-oled-led-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "esp8266-dht11-oled-led",
  storageBucket: "esp8266-dht11-oled-led.firebasestorage.app",
  messagingSenderId: "886272603315",
  appId: "1:886272603315:web:c2cd8fbb28b6837c5d2cc6",
  measurementId: "G-950LCQGHBE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Realtime Database
const db = getDatabase(app);

// Export for use in your React app
export { db, ref, onValue, set };
