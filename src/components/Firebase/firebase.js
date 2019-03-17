import app from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase ( using env. file in root - not sure if working, check gitignore)
// optional with firebase Project panti-prod - config in new env.production - see tutorial)

var config = {
  apiKey: "AIzaSyASqvoZ3hGYNnp5_BTjHm88zZAHzFLuYCA",
  authDomain: "panti-3a46f.firebaseapp.com",
  databaseURL: "https://panti-3a46f.firebaseio.com",
  projectId: "panti-3a46f",
  storageBucket: "panti-3a46f.appspot.com",
  messagingSenderId: "1039443157872"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
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
}

export default Firebase;
