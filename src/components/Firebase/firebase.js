import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Initialize Firebase ( using env. file in root - not sure if working, check gitignore)
// optional with firebase Project panti-prod - config in new env.production - see tutorial)

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_API_KEY_YT 
};


class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // **** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();


  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  //* Database API  */

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
}

export default Firebase;
