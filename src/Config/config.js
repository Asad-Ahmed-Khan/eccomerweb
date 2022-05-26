import * as firebase from 'firebase'

import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD3K3T_5am9MWYMNsEWBiPC9uwIbVs_PAk",
    authDomain: "auth-development-9c81c.firebaseapp.com",
    projectId: "auth-development-9c81c",
    storageBucket: "auth-development-9c81c.appspot.com",
    messagingSenderId: "845222367362",
    appId: "1:845222367362:web:c42d2de94f8a660835249b"
  };
//   const app = initializeApp(firebaseConfig);

  const fire = firebase.initializeApp(firebaseConfig)


 
 

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export {fire, auth, db, storage, googleAuthProvider, facebookAuthProvider }