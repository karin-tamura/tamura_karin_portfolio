// lib/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "●●●",
  authDomain: "●●●.firebaseapp.com",
  projectId: "●●●",
  storageBucket: "●●●.appspot.com",
  messagingSenderId: "●●●",
  appId: "●●●"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
