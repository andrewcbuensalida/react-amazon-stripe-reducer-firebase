export const initialState = {
	basket: [],
	user: null,
};

// Selector
export const getBasketTotal = (basket) =>
	// reduce takes in a function that returns the amount that will be used in the next function call, and item is the current item value. in this case, amount is the running amount of the item's prices. 0 is the initial.
	basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
	console.log(action);
	switch (action.type) {
		case "ADD_TO_BASKET":
			return {
				...state,
				basket: [...state.basket, action.item],
			};

		case "EMPTY_BASKET":
			return {
				...state,
				basket: [],
			};

		case "REMOVE_FROM_BASKET":
			// instead of below, could probably use for loop, then if action.id==basketItem.id, splice then break.
			const index = state.basket.findIndex(
				(basketItem) => basketItem.id === action.id
			);
			let newBasket = [...state.basket];

			if (index >= 0) {
				newBasket.splice(index, 1);
			} else {
				console.warn(
					`Cant remove product (id: ${action.id}) as its not in basket!`
				);
			}

			return {
				...state,
				basket: newBasket,
			};

		case "SET_USER":
			return {
				...state,
				user: action.user,
			};

		default:
			return state;
	}
};

export default reducer;
