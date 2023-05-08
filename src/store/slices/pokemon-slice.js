import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    loading: false,
    pokemons: [],
    selectedPokemon: null,
    error: "",
  },
  reducers: {
    pokemonRequest: (state) => {
      state.loading = true;
    },
    success: (state, action) => {
      state.loading = false;
      state.pokemons = action.payload;
      state.error = null;
    },
    requestError: (state, action) => {
      state.loading = false;
      state.pokemons = [];
      state.error = action.payload;
    },
    selectPokemon: (state, action) => {
      state.selectedPokemon = state.pokemons.filter((pokemon) => {
        return parseInt(pokemon.id) === parseInt(action.payload);
      })[0];
    },
  },
});

export const getPokemons = (offset) => (dispatch) => {
  //console.log(offset);
  dispatch(pokemonRequest());
  const endPoint = `https://pokeapi.co/api/v2/pokemon?limit=${10}&offset=${offset}`;
  const headers = {
    "Content-Type": "application/json",
  };
  axios
    .get(endPoint, { headers })
    .then(async (response) => {
      const rawData = response.data.results;
      const pokemons = await Promise.all(
        rawData.map(async (data) => {
          return axios.get(data.url).then((pokemonData) => {
            return pokemonData.data;
          });
        })
      );
      //console.log(pokemons);
      dispatch(success(pokemons));
    })
    .catch((err) => {
      dispatch(requestError(err));
    });
};

export const { pokemonRequest, success, requestError, selectPokemon } =
  pokemonSlice.actions;

export default pokemonSlice.reducer;
