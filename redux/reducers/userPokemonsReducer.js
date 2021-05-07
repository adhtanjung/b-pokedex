const INITIAL_STATE = {
	collectedPoke: [],
};

export const userPokemonsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "POKEMON_ADDED":
			return {
				...state,
				collectedPoke: [...state.collectedPoke, action.payload],
			};
		case "POKEMON_CHANGED":
			return {
				...state,
				collectedPoke: action.payload,
			};
		default:
			return state;
	}
};
