export const TOGGLE_THEME = "TOGGLE_THEME";

export const toggleTheme = (payload: string) => ({
	type: TOGGLE_THEME,
	payload,
});
