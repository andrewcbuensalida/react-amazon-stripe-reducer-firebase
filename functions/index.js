const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: "https://amazon.anhonestobserver.com" })); //uncomment this in production. this line is really important because if hackers make a request where they reduced the price, it wont work because the origin wont be amazon.anhonestobserver.com. actually, when i make a request from postman, i still get the secret key. so i guess hackers could use postman to get a secret key, but i guess it doesnt matter because what's important is what's in the firestore database order, which i protected by restricting firebase apiKey to only my domain, even though they can inspect it in Chrome.
// app.use(cors()); //comment this in production
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
	const total = request.query.total;

	// this will be seen in firebase functions logs
	console.log("Getting the payment ready for this amount >>> ", total);

	// making stripe server create a secret key for the transaction, then will be sent to fron-end. in stripe dashboard, this can be seen in the events section and in the logs.
	const paymentIntent = await stripe.paymentIntents.create({
		amount: total, // subunits of the currency
		currency: "usd",
	});

	// OK - Created. i changed this from send to json, dont know if it's wrong but it works. still getting cors after purchase, but not on checkout. cors only happens when basket becomes empty.
	response.status(201).json({
		clientSecret: paymentIntent.client_secret,
	});
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint
// http://localhost:5001/challenge-4b2b2/us-central1/api
