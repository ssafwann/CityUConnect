import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBm_Wci15GLZg9ZhKHREwMetlXFxLp0PRg",
  authDomain: "cityuconnect.firebaseapp.com",
  projectId: "cityuconnect",
  storageBucket: "cityuconnect.appspot.com",
  messagingSenderId: "492795011499",
  appId: "1:492795011499:web:d4f1596da3c87e6e1672ee",
  measurementId: "G-3CE0EKM41J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
export const db = getFirestore(app);
