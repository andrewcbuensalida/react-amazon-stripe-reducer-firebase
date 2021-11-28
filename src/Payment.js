import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import FlipMove from "react-flip-move";

import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
	const [{ basket, user }, dispatch] = useStateValue();
	const history = useHistory();

	const stripe = useStripe();
	const elements = useElements();

	const [succeeded, setSucceeded] = useState(false);
	const [processing, setProcessing] = useState("");
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState(true);

	useEffect(() => {
		// get secret from node server, which got it from stripe.
		const getClientSecret = async () => {
			const response = await axios({
				method: "post",
				// Stripe expects the total in a currencies subunits
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
			});
			setClientSecret(response.data.clientSecret);
		};

		getClientSecret();
		// whenever the basket changes, get a new secret key.
	}, [basket]);

	console.log("THE SECRET IS >>>", clientSecret);
	console.log("👱", user);

	const handleSubmit = async (event) => {
		// do all the fancy stripe stuff...
		event.preventDefault();
		setProcessing(true);

		const payload = await stripe
			// sending secret key from node server to stripe server to see if it matches
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				// paymentIntent = payment confirmation

				db.collection("users")
					.doc(user?.uid)
					.collection("orders")
					.doc(paymentIntent.id)
					.set({
						basket: basket,
						amount: paymentIntent.amount,
						created: paymentIntent.created,
					});

				setSucceeded(true);
				setError(null);
				setProcessing(false);

				dispatch({
					type: "EMPTY_BASKET",
				});

				history.replace("/orders");
			});
	};

	const handleChange = (event) => {
		// Listen for changes in the CardElement
		// and display any errors as the customer types their card details
		console.log(`This is event`);
		console.log(event);

		setDisabled(event.empty);
		setError(event.error ? event.error.message : "");
	};

	return (
		<div className="payment">
			<div className="payment__container">
				<h1>
					Checkout (<Link to="/checkout">{basket?.length} items</Link>
					)
				</h1>

				{/* Payment section - delivery address */}
				<div className="payment__section">
					<div className="payment__title">
						<h3>Delivery Address</h3>
					</div>
					<div className="payment__address">
						<p>{user?.email}</p>
						<p>123 React Lane</p>
						<p>Los Angeles, CA</p>
					</div>
				</div>

				{/* Payment section - Review Items */}
				<div className="payment__section">
					<div className="payment__title">
						<h3>Review items and delivery</h3>
					</div>
					<div className="payment__items">
						<FlipMove>
							{basket.map((item) => (
								<CheckoutProduct
									key={item.id}
									id={item.id}
									title={item.title}
									image={item.image}
									price={item.price}
									rating={item.rating}
								/>
							))}
						</FlipMove>
					</div>
				</div>

				{/* Payment section - Payment method */}
				<div className="payment__section">
					<div className="payment__title">
						<h3>Payment Method</h3>
					</div>
					<div className="payment__details">
						{/* Stripe magic will go */}

						<form onSubmit={handleSubmit}>
							{/* wrap CardElement so can put a border */}
							<div className="cardElement">
								{/* CardElement is from Stripe */}
								<CardElement
									options={{
										style: { base: { fontSize: "1.2rem" } },
									}}
									onChange={handleChange}
								/>
							</div>
							<div className="payment__priceContainer">
								<CurrencyFormat
									// value is from value below, the getBasketTotal
									renderText={(value) => (
										<h3>Order Total: {value}</h3>
									)}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"$"}
								/>
								<button
									disabled={
										processing || disabled || succeeded
									}
								>
									<span>
										{processing ? (
											<p>Processing</p>
										) : (
											"Buy Now"
										)}
									</span>
								</button>
							</div>

							{/* Errors if card input is invalid */}
							{error && <div>{error}</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;
