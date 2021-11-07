import React, { createContext, useReducer } from "react";
import EventReducer from "./EventReducer";
//initial State
const initialState = {
	events: [],
};

// create context
export const EventContext = createContext(initialState);

// provider component
export const EventProvider = ({ children }) => {
	const [state, dispatch] = useReducer(EventReducer, initialState);

	//actions
	function addEvent(event) {
		dispatch({
			type: "ADD_EVENT",
			payload: event,
		});
	};

	function deleteEvent(id) {
		dispatch({
			type: "DELETE_EVENT",
			payload: id,
		});
	};

	function editEvent(id) {
		dispatch({
			type: "EDIT_EVENT",
			payload: id,
		});
	}

	return (
		<EventContext.Provider
			value={{ events: state.events, addEvent, deleteEvent, editEvent }}
		>
			{children}
		</EventContext.Provider>
	);
};
