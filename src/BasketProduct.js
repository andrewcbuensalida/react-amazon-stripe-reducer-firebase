import React, { forwardRef } from "react";
import "./BasketProduct.css";
import { useStateValue } from "./StateProvider";

const BasketProduct = forwardRef(
	({ id, image, title, price, rating, hideButton }, ref) => {
		const [{ basket }, dispatch] = useStateValue();

		const removeFromBasket = () => {
			// remove the item from the basket
			dispatch({
				type: "REMOVE_FROM_BASKET",
				id: id,
			});
		};

		return (
			<div ref={ref} className="BasketProduct">
				<img className="BasketProduct__image" src={image} />

				<div className="BasketProduct__info">
					<p className="BasketProduct__title">{title}</p>
					<p className="BasketProduct__price">
						<small>$</small>
						<strong>{price}</strong>
					</p>
					<div className="BasketProduct__rating">
						{Array(rating)
							.fill()
							.map((_, i) => (
								<p>🌟</p>
							))}
					</div>
					{!hideButton && (
						<button onClick={removeFromBasket}>
							Remove from Basket
						</button>
					)}
				</div>
			</div>
		);
	}
);

export default BasketProduct;
