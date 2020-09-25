import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDLy-cJJKi_zixIMmmkdegJqfkFQYhrEms",
  authDomain: "catch-of-the-day-davidasteed-1.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-davidasteed-1.firebaseio.com"
  // projectId: "catch-of-the-day-davidasteed-1",     // not in use
  // storageBucket: "catch-of-the-day-davidasteed-1.appspot.com",
  // messagingSenderId: "534940223092",
  // appId: "1:534940223092:web:5f09c6854d40725cedb321"
});

const base = Rebase.createClass(firebaseApp.database()); // create rebase "bindings"

// this is a named export
export { firebaseApp };

// this is a default export
export default base;
