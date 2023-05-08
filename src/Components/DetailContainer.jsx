import {
  Card,
  CardContent,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const DetailContainer = () => {
  const pokemon = useSelector((state) => state.pokemon.selectedPokemon); //get current selected pokemon
  const [spriteIndex, setSpriteIndex] = useState(0);
  const sprites = Object.values(pokemon?.sprites).filter((sprite) => {
    return typeof sprite === "string";
  });
  const [abilities, setAbilities] = useState(null);
  const [moves, setMoves] = useState(null);
  const [specie, setSpecie] = useState(null);

  const backwardSprite = () => {
    if (spriteIndex > 0) {
      setSpriteIndex((prev) => prev - 1);
    }
  };

  const forwardSprite = async () => {
    if (spriteIndex + 1 >= sprites.length) {
      setSpriteIndex(0);
    } else {
      setSpriteIndex((prev) => prev + 1);
    }
  };

  const getDescription = (entries) => {
    const effecDescription = entries?.filter((entry) => {
      if (entry?.language?.name === "en") {
        return entry?.effect;
      }
      return null;
    })[0];

    return <>{effecDescription?.effect} </>;
  };

  const renderMoves = () => {
    const render = moves?.slice(0, 5) || [];

    return render.map((m, index) => {
      return (
        <div key={index}>
          <Typography variant="body1" fontWeight={"500"}>
            {m?.name}
          </Typography>
          <Typography variant="body2" marginBottom={1}>
            {getDescription(m?.effect_entries)}
          </Typography>
        </div>
      );
    });
  };

  useEffect(() => {
    const promises = Object.values(pokemon.abilities).map(async (a) => {
      return axios.get(a.ability.url).then((response) => {
        return response.data;
      });
    });
    Promise.all(promises).then((abilities) => {
      setAbilities(abilities);
    });
  }, [pokemon.abilities]);

  useEffect(() => {
    const promises = pokemon.moves.map(async (m) => {
      return axios.get(m.move.url).then((response) => {
        return response.data;
      });
    });
    Promise.all(promises).then((moves) => {
      setMoves(moves);
    });
  }, [pokemon.moves]);

  useEffect(() => {
    axios.get(pokemon.species.url).then((response) => {
      setSpecie(response.data);
    });
  }, [pokemon.species.url]);

  return (
    <Container>
      <Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <IconButton onClick={backwardSprite}>
            <KeyboardArrowLeftIcon />
          </IconButton>

          <img
            src={sprites[spriteIndex]}
            style={{ width: "300px" }}
            alt="dummy"
          />
          <IconButton onClick={forwardSprite} id="right">
            <KeyboardArrowRightIcon />
          </IconButton>
        </Stack>
        <Stack direction={"row"} maxHeight={800} spacing={2} marginTop={2}>
          <Stack spacing={2} width={"50%"}>
            <Card variant="outlined">
              <CardContent>
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"baseline"}
                  marginBottom={2}
                >
                  <Typography variant="h4">{pokemon.name}</Typography>
                  <Typography variant="body1" fontStyle={"italic"}>
                    {pokemon.types.map((type) => {
                      return type.type.name + " ";
                    })}
                  </Typography>
                </Stack>
                <Typography>
                  {specie?.flavor_text_entries[0]?.flavor_text}
                </Typography>
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Habilidades </Typography>
                {abilities?.map((a, index) => {
                  return (
                    <div key={index}>
                      <Typography variant="body1" fontWeight={500}>
                        {a.name}
                      </Typography>
                      <Typography variant="body2" marginBottom={1}>
                        {getDescription(a.effect_entries)}
                      </Typography>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </Stack>
          <Card sx={{ width: "50%" }} variant="outlined">
            <CardContent sx={{ height: "100%" }}>
              <Typography variant="h6">Movimientos </Typography>
              {renderMoves()}
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </Container>
  );
};

export default DetailContainer;
