import React from "react";
import "./Basket.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import BasketProduct from "./BasketProduct";
import FlipMove from "react-flip-move";

function Basket() {
	const [{ basket, user }, dispatch] = useStateValue();

	return (
		<div className="Basket">
			<div className="Basket__left">
				<img
					className="Basket__ad"
					src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
					alt=""
				/>
				{/* style position relative because of flipmove */}
				<div style={{ position: "relative" }}>
					<h3>Hello, {user?.email}</h3>
					<h2 className="Basket__title">Your shopping Basket</h2>
					{/* bug. visually removes bottom item. might have something to do with not having a unique key */}
					<FlipMove>
						{basket.map((item, index) => {
							return (
								<BasketProduct
									key={item.id}
									id={item.id}
									title={item.title}
									image={item.image}
									price={item.price}
									rating={item.rating}
								/>
							);
						})}
					</FlipMove>
				</div>
			</div>

			<div className="Basket__right">
				<Subtotal />
			</div>
		</div>
	);
}

export default Basket;
