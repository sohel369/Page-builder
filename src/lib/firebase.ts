import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace with your actual Firebase config from Firebase Console
// Go to Firebase Console > Project Settings > General > Your apps > Add Web App
const firebaseConfig = {
    apiKey: "AIzaSyAW1-xO2_xHSKCdZh_xyi_8Bj4GrRJ5qNY",
    authDomain: "pagedotbuilder.firebaseapp.com",
    projectId: "pagedotbuilder",
    storageBucket: "pagedotbuilder.appspot.com",
    messagingSenderId: "21759833670",
    appId: "1:21759833670:web:dbeaf0d01b16d6e8da3c47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
