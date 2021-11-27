import React, { createContext, useContext, useReducer } from "react";

// Prepares the dataLayer
export const StateContext = createContext();

// Wrap our app and provide the Data layer
export const StateProvider = ({ reducer, initialState, children }) => (
	// useReducer returns an array of [state, dispatch], state being in the form of
	//  {
	// 	    basket: [],
	// 	    user: null,
	//    }
	<StateContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</StateContext.Provider>
);

// Pull information from the data layer. calling useStateValue returns whatever you put in value in the StateContext.Provider above, which would be [state,dispatch] aka [{user,basket},dispatch], user being the object firebase auth returns, and basket being an array of items. useStateValue is a custom hook
export const useStateValue = () => useContext(StateContext);
