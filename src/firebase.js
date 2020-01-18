import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'
var firebaseConfig = {
  apiKey: "AIzaSyCULbVSQR0fYI8IljFgGcNpdm7ciuKCbtA",
  authDomain: "thoughtsmaker0.firebaseapp.com",
  databaseURL: "https://thoughtsmaker0.firebaseio.com",
  projectId: "thoughtsmaker0",
  storageBucket: "thoughtsmaker0.appspot.com",
  messagingSenderId: "49471328373",
  appId: "1:49471328373:web:44a335092084c46de2e83c",
  measurementId: "G-17E609FZMZ"
};
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { fb, db }