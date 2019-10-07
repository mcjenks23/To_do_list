import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAWPqfo5ycw82KR72s5fRHTYtf1mEek8h8",
  authDomain: "authentication-64d08.firebaseapp.com",
  databaseURL: "https://authentication-64d08.firebaseio.com",
  projectId: "authentication-64d08",
  storageBucket: "",
  messagingSenderId: "404553418409",
  appId: "1:404553418409:web:694d62963d637722900bb8"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
