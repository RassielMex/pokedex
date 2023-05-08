import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./slices/pokemon-slice";

export default configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});
