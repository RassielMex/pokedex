import { Button, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectPokemon } from "../store/slices/pokemon-slice";

export const PokemonRow = ({ pokemon }) => {
  const [shiny, setShiny] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLinkClick = () => {
    dispatch(selectPokemon(pokemon.id));
    navigate(`/detail/${pokemon.id}`);
  };

  return (
    <TableRow
      key={pokemon.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {pokemon.id}
      </TableCell>
      <TableCell align="right">
        <Link onClick={handleLinkClick}> {pokemon.name}</Link>
      </TableCell>
      <TableCell align="right">
        <img
          src={
            shiny ? pokemon.sprites.front_default : pokemon.sprites.front_shiny
          }
          alt="dummy"
          style={{ maxWidth: "50px", maxHeight: "50px" }}
        ></img>
      </TableCell>
      <TableCell align="right">
        {pokemon.types.map((type) => {
          return type.type.name + " ";
        })}
      </TableCell>
      <TableCell align="right">
        {pokemon.abilities.map((ability) => {
          return ability.ability.name + " ";
        })}
      </TableCell>
      <TableCell align="right">
        <Button
          variant="contained"
          sx={{ backgroundColor: "gray" }}
          onClick={() => {
            setShiny(!shiny);
          }}
        >
          Shiny
        </Button>
      </TableCell>
    </TableRow>
  );
};
