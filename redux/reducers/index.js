import { combineReducers } from "@reduxjs/toolkit";
import { userPokemonsReducer } from "./userPokemonsReducer";

export default combineReducers({
	userPoke: userPokemonsReducer,
});
