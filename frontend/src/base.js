import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
});

const base = Rebase.createClass(app.database());

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firebaseApp = app; //   <------ export firebase
export default base;
