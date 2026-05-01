
import { TOGGLE_THEME } from "./actions";

interface ThemeAction {
  type: typeof TOGGLE_THEME;
  payload: string;
}

const initialState = {
	theme: "white",
};

const themeReducer = (state = initialState, action: ThemeAction) => {
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


export default themeReducer; 
