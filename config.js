import firebase from 'firebase';
require('@firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyD8w2sCDNz8EEzwRXSuIMOIXU0ml8czWZU",
    authDomain: "booksanta-84493.firebaseapp.com",
    projectId: "booksanta-84493",
    storageBucket: "booksanta-84493.appspot.com",
    messagingSenderId: "846132943666",
    appId: "1:846132943666:web:d58d8eeb0f949baf97d52b"
  };

firebase.initializeApp(firebaseConfig);
export default firebase.firestore();