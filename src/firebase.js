import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAhGAo_xDKU4HQarhe9SKOEQqZA3b5c9MU",
    authDomain: "lab-notes-a2013.firebaseapp.com",
    projectId: "lab-notes-a2013",
    storageBucket: "lab-notes-a2013.appspot.com",
    messagingSenderId: "472066003844",
    appId: "1:472066003844:web:64fab7e735a2369e1f03d1",
    measurementId: "G-R7P6VQVBXZ"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const auth = firebase.auth()

export {db, auth}