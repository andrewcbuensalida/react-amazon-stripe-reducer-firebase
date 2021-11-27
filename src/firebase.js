import firebase from "firebase";

// this is my stuff
const firebaseConfig = {
	apiKey: "AIzaSyBW9zOT2eHzHJe6CoifW7hRIt-m9nHx8n4",
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
