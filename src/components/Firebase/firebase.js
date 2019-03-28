import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Initialize Firebase ( using env. file in root - not sure if working, check gitignore)
// optional with firebase Project panti-prod - config in new env.production - see tutorial)
import CONFIG from './config_keys';

const config = {...CONFIG
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
  message = uid => this.db.ref(`message/${uid}`);
  messages = () => this.db.ref('messages');

}

export default Firebase;
