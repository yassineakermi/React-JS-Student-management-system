import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXiuZ5SUmjPNOWSE3zYLvS_KmG9HIZl8s",
  authDomain: "inventory-management-762d8.firebaseapp.com",
  projectId: "inventory-management-762d8",
  storageBucket: "inventory-management-762d8.appspot.com",
  messagingSenderId: "1065410034588",
  appId: "1:1065410034588:web:f52accc5ad82aeab46a659",
  measurementId: "G-RM01ZD5QHT",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };
