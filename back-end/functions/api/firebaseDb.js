const firebase = require('firebase');
const firestore = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyC7Il753rZkr6wX9ugRumFQnPIAtrpUKtw",
  authDomain: "fir-tut2-82e4f.firebaseapp.com",
  databaseURL: "https://fir-tut2-82e4f.firebaseio.com",
  projectId: "fir-tut2-82e4f",
  storageBucket: "fir-tut2-82e4f.appspot.com",
  messagingSenderId: "1046116434295",
  appId: "1:1046116434295:web:8a872fcfecf9abfe1e2172"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore();

module.exports = firebase;