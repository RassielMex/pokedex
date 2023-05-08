import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { PokemonRow } from "./PokemonRow";

const PokemonList = ({ pokemons }) => {
  //const pokemons = useSelector((state) => state.pokemon.pokemons);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Vista previa</TableCell>
            <TableCell align="right">Tipo</TableCell>
            <TableCell align="right">Habilidades</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pokemons.length > 0
            ? pokemons?.map((pokemon, index) => (
                <PokemonRow pokemon={pokemon} key={index} />
              ))
            : []}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PokemonList;
