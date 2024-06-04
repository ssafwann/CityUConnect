import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);
