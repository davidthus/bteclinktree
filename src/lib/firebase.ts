import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBsn6mBzGCBJsVDkf2M4T6zDndkx2r1Lmw",
  authDomain: "bteclinktree.firebaseapp.com",
  projectId: "bteclinktree",
  storageBucket: "bteclinktree.appspot.com",
  messagingSenderId: "124027006303",
  appId: "1:124027006303:web:c3a27345bd70319bf05aea",
  measurementId: "G-ZS82V0EXF5",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const firestore = getFirestore();
