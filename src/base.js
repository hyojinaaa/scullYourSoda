import Rebase from 're-base';
import firebase from 'firebase/app';
import { config } from './config';
import 'firebase/auth';
import 'firebase/database';

const app = firebase.initializeApp({
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseURL,
});

const base = Rebase.createClass(app.database());

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firebaseApp = app; //   <------ export firebase
export default base;
