import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Initialize Firebase ( using env. file in root - not sure if working, check gitignore)
// optional with firebase Project panti-prod - config in new env.production - see tutorial)
import CONFIG from './config_keys';

const config = { ...CONFIG };

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();

    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

  // **** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doSignInWithGoogle = () => 
  this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => {
    this.auth.signInWithPopup(this.facebookProvider);
  }
  
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);


    // *** Merge Auth and DB User API *** //

  onAuthListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if(!dbUser.roles){
              dbUser.roles = [];
            }

            // merge authUser with dbUser
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  //* Database API  */

  // *** User API 
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');

  // *** Contact Form API

  message = uid => this.db.ref(`message/${uid}`);
  messages = () => this.db.ref('messages');

  // *** Chat API 

  text = uid => this.db.ref(`texts/${uid}`)
  texts = () => this.db.ref('texts')
}

export default Firebase;
