import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";

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
export const db = getFirestore();

function userStore() {
  let unsubscribe: () => void;

  if (!auth || !globalThis.window) {
    console.warn("Auth is not initialized or not in browser");
    const { subscribe } = writable<User | null>(null);
    return {
      subscribe,
    };
  }
  const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
    unsubscribe = onAuthStateChanged(auth, (user) => {
      set(user);
    });

    return () => unsubscribe();
  });

  return { subscribe };
}

export const user = userStore();
