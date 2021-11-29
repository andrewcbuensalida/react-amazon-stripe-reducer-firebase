import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import Order from "./Order";

function Orders() {
	const [{ basket, user, completedOrder }, dispatch] = useStateValue();
	const [pastOrders, setPastOrders] = useState([]);

	useEffect(() => {
		if (user) {
			db.collection("users")
				.doc(user?.uid)
				.collection("orders")
				.orderBy("created", "desc")
				// onsnapshop creates a real-time listener so when orders change, it updates
				.onSnapshot((snapshot) =>
					setPastOrders(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					)
				);
		} else {
			setPastOrders([]);
		}
		// whenever using outside variable, have to put in here
	}, [user]);

	return (
		<div className="orders">
			<div className="orders__order">
				{completedOrder && (
					<>
						<h1>Your Order is Complete.</h1>
						<Order order={completedOrder} />
					</>
				)}

				{pastOrders.length > 0 ? (
					<h1>Past Orders</h1>
				) : (
					<h1>No Past Orders</h1>
				)}
				{pastOrders.map((order, index) => {
					// if there is a completed order, and past orders, the completed order wont be rendered twice
					if (completedOrder && index == 0) {
						return;
					}
					return <Order order={order} />;
				})}
			</div>
		</div>
	);
}

export default Orders;
