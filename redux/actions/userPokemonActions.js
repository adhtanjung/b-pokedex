export const userAddPokemonAction = (pokemon, changed) => {
	return async (dispatch) => {
		if (changed) {
			dispatch({
				type: "POKEMON_CHANGED",
				payload: pokemon,
			});
		} else {
			dispatch({
				type: "POKEMON_ADDED",
				payload: pokemon,
			});
		}
	};
};
