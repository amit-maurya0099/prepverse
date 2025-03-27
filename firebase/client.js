
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDtMRWk6oC6EBTevk2gIQAU2E42d7-C14o",
  authDomain: "prepverse-2e407.firebaseapp.com",
  projectId: "prepverse-2e407",
  storageBucket: "prepverse-2e407.firebasestorage.app",
  messagingSenderId: "122008769257",
  appId: "1:122008769257:web:8bd6bd196e99a56f855678",
  measurementId: "G-5JTSH85SQ5"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig):getApp();
export const auth=getAuth(app);
export const db=getFirestore(app)