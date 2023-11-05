import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCQxZTwv3pQLN-wnUSE4GnwXuB-lYPM6ro',
  authDomain: 'ecommercereference-d77c5.firebaseapp.com',
  projectId: 'ecommercereference-d77c5',
  storageBucket: 'ecommercereference-d77c5.appspot.com',
  messagingSenderId: '861302932504',
  appId: '1:861302932504:web:a633da62dbde82f060af6d',
  measurementId: 'G-2E19MQJ055',
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export { auth, fs, storage };
