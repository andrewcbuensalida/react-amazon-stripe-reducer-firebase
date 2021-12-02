import firebase from "firebase";

// this should be private because hackers could clone this app, then push to the database with a fictional order. except that you cant make this private because it's in the front end, they can chrome inspect it. and even if i set the read write rules of firestore to only allow auth users, they can just sign in in their clone and edit the firestore. that's why do https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public in gcp console, restrict use of this apiKey to only amazon.anhonestobserver.com. then create another key for development that has no restrictions so that my localhost will be allowed to edit firebase. have to do npm run start again for .env's to take effect. react detects if app is running in development or production, then selects the correct .env to get this from. for additional security, activate app check in firebase.
const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: "clone-b8548.firebaseapp.com",
	projectId: "clone-b8548",
	storageBucket: "clone-b8548.appspot.com",
	messagingSenderId: "450950941403",
	appId: "1:450950941403:web:e3ba9f2be2c1ccc47b1afe",
	measurementId: "G-NL7ZZ3PJZC",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
