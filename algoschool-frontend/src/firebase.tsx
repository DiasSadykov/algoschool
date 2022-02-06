import firebase from 'firebase/app';
import 'firebase/firestore'; 
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBJ4Yy4FwSxzTHoFjiIvTZt2eNlQekfFL4",
    authDomain: "algo-school.firebaseapp.com",
    projectId: "algo-school",
    storageBucket: "algo-school.appspot.com",
    messagingSenderId: "146178657850",
    appId: "1:146178657850:web:779c6ad8817819340a6f03",
    measurementId: "G-2F49S3PYWE"
  };

export const firebaseUiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
      },
  };
  


firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()

export default firebase;