import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectPokemon } from "../store/slices/pokemon-slice";

const PokemonCard = ({ pokemon }) => {
  const [shiny, setShiny] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLinkClick = () => {
    dispatch(selectPokemon(pokemon.id));
    navigate(`/detail/${pokemon.id}`);
  };

  return (
    <Card variant="outlined" sx={{ maxWidth: "250px" }}>
      <CardContent>
        <img
          src={
            shiny ? pokemon.sprites.front_default : pokemon.sprites.front_shiny
          }
          style={{ width: "100%", maxHeight: "150px" }}
          alt="dumy"
        ></img>

        <Link onClick={handleLinkClick} underline="none">
          <Typography variant="h5">{pokemon.name}</Typography>
        </Link>
        <Typography variant="body1">
          {pokemon.types.map((type) => {
            return type.type.name + " ";
          })}
        </Typography>
        <Typography variant="body1">
          {pokemon.abilities.map((ability) => {
            return ability.ability.name + " ";
          })}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          sx={{ backgroundColor: "gray" }}
          onClick={() => {
            setShiny(!shiny);
          }}
        >
          Shiny
        </Button>
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
