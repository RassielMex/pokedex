import { Grid } from "@mui/material";
import React from "react";
import PokemonCard from "./PokemonCard";
import { useSelector } from "react-redux";

const PokemonGrid = ({ pokemons }) => {
  return (
    <Grid container spacing={{ xs: 2 }}>
      {pokemons.map((pokemon, index) => (
        <Grid item xs={2} sm={3} key={index}>
          <PokemonCard pokemon={pokemon} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PokemonGrid;
