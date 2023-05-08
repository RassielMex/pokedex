import React, { useEffect, useState } from "react";
import MainAppBar from "./MainAppBar";
import PokemonList from "./PokemonList";
import PokemonGrid from "./PokemonGrid";
import { Container, Pagination, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../store/slices/pokemon-slice";

const MainContainer = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1); //sets current page for paginatcion
  const pokemons = useSelector((state) => state.pokemon.pokemons); // gets all pokemons from api
  const [search, setSearch] = useState(""); //keeps word to search
  const [filteredList, setFilteredList] = useState([]); //set list of pokemons to show

  const [list, setList] = useState(true);
  const changeLayout = (change) => {
    setList(change);
  };

  //gets pokemons according to pagination
  useEffect(() => {
    dispatch(getPokemons((page - 1) * 10));
    return () => {};
  }, [dispatch, page]);

  //get input word to search
  const filter = (search) => {
    setSearch(search);
  };

  //Set list to show according to value of "Search"
  useEffect(() => {
    if (search) {
      setFilteredList(
        pokemons.filter((pokemon) => pokemon.name.startsWith(search))
      );
    } else {
      setFilteredList(pokemons);
    }
  }, [search, pokemons]);

  return (
    <Container>
      <Stack alignItems={"center"}>
        <MainAppBar changeLayout={changeLayout} filter={filter} />
        {list ? (
          <PokemonList pokemons={filteredList} />
        ) : (
          <PokemonGrid pokemons={filteredList} />
        )}
        <Pagination
          page={page}
          count={10}
          onChange={(e, value) => {
            setPage(value);
          }}
          sx={{ marginTop: "16px" }}
        />
      </Stack>
    </Container>
  );
};

export default MainContainer;
