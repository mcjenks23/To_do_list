import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCFahjSjawUgJNZ3tRfCPQg8k9GzlHaXuk",
  authDomain: "todo-808be.firebaseapp.com",
  databaseURL: "https://todo-808be.firebaseio.com",
  projectId: "todo-808be",
  storageBucket: "todo-808be.appspot.com",
  messagingSenderId: "206570740846",
  appId: "1:206570740846:web:a76fa086479dc66281da7f",
  measurementId: "G-9RELJQWBJ5"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
