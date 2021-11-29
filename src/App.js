import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Basket from "./Basket";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ScrollToTop from "./ScrollToTop";

// need to put my own
const promise = loadStripe(
	"pk_test_51Jj85AF5aEhL0aJtHOWaLQeHPEbnbfqJEiOcLXVjCTRRbjzlDrsh5K5PJPTlEpri0NIClZLWRNiv97urYr5M5KyC009D2NLttw"
);

// flow of purchasing an item is: in home, click add to basket, then click on basket in upper right which brings to basket. now click proceed to checkout page to go to payment. click buy now to charge card and go to orders.

function App() {
	const [{}, dispatch] = useStateValue();

	useEffect(() => {
		// will only run once when the app component loads...

		auth.onAuthStateChanged((authUser) => {
			// console.log("THE USER IS >>> ", authUser);

			if (authUser) {
				// the user just logged in / the user was logged in

				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				// the user is logged out
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
	}, []);

	return (
		<Router>
			<div className="app">
				<Switch>
					<Route path="/orders">
						<Header />
						<Orders />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/Basket">
						{/* scrolls to top when navigating to basket page */}
						<ScrollToTop />
						<Header />
						<Basket />
					</Route>
					<Route path="/payment">
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>
					{/* this should be at the bottom so it doesnt match to anything else */}
					<Route path="/">
						<Header />
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
