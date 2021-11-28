import axios from "axios";

// need to put my own
const instance = axios.create({
	// THE API (cloud function) URL
	baseURL: "https://us-central1-clone-b8548.cloudfunctions.net/api", //this is for production. get this from deploying functions.
	// baseURL: "http://localhost:5001/clone-b8548/us-central1/api", //this is for development. get this from running the functions emulator
});

export default instance;
