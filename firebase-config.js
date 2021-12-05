import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "sunik-rpg.firebaseapp.com",
  projectId: "sunik-rpg",
  storageBucket: "sunik-rpg.appspot.com",
  messagingSenderId: "480685073928",
  appId: "1:480685073928:web:6a6eb80bbcb32c420693bd",
  measurementId: "G-4JBPPQ43H4"
};

export const app = initializeApp(firebaseConfig);