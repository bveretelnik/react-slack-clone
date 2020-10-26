import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyCF8F0FIX3sdI72nH4reNblo-4tAhfBO_M",
  authDomain: "react-slack-clone-527e8.firebaseapp.com",
  databaseURL: "https://react-slack-clone-527e8.firebaseio.com",
  projectId: "react-slack-clone-527e8",
  storageBucket: "react-slack-clone-527e8.appspot.com",
  messagingSenderId: "871198037300",
  appId: "1:871198037300:web:f7cb3db8254aa90c4b8161",
};

firebase.initializeApp(firebaseConfig);
