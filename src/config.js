// firebase config key setup
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Sfumato's web app configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFjuDqluAUAjjj3raFYJH0Z8BsdFvq8Rs",
  authDomain: "sfumato-ad7d0.firebaseapp.com",
  projectId: "sfumato-ad7d0",
  storageBucket: "sfumato-ad7d0.appspot.com",
  messagingSenderId: "539820648849",
  appId: "1:539820648849:web:d4a249d4a909fc8d331230",
};

if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
