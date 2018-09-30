import Rebase from 're-base';
import * as firebase from 'firebase';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyAAZbVQNNLHcPk0rgP9U13Z539emIMJ_As',
  authDomain: 'scullyoursoda.firebaseapp.com',
  databaseURL: 'https://scullyoursoda.firebaseio.com',
});

const base = Rebase.createClass(app.database());

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firebaseApp = app; //   <------ export firebase
export default base;
