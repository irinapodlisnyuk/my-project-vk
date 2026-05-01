import { combineReducers } from "redux";
import { TOGGLE_THEME } from "./actions";

const initialState = {
	theme: "white",
};

const themeReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_THEME:
			return {
				...state,
				theme: action.payload,
			};
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	theme: themeReducer,
});

export default rootReducer;
