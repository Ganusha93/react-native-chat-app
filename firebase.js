
import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDoCCILrK87ojmFGzO3v35qI16_J8HcdLU",
    authDomain: "signal-chat-app-ac156.firebaseapp.com",
    projectId: "signal-chat-app-ac156",
    storageBucket: "signal-chat-app-ac156.appspot.com",
    messagingSenderId: "58117836673",
    appId: "1:58117836673:web:74478bb3e6991a9edf6280"
  };

  let app;
  if (firebase.apps.length===0) {
    app=firebase.initializeApp(firebaseConfig);
  }else{
    app=firebase.app();
  }

  const db=app.firestore();
  const Auth = firebase.auth();

  export {Auth,db};