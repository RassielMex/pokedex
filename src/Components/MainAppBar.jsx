import {
  Button,
  ButtonGroup,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";

const MainAppBar = ({ changeLayout, filter }) => {
  const [list, setList] = useState(true);

  //Tracks layout according to click of buttons
  const setLayout = (e) => {
    if (e.target.id === "btn_list") {
      setList(true);
      changeLayout(true);
    } else {
      setList(false);
      changeLayout(false);
    }
  };

  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"end"}
        justifyContent={"space-between"}
        margin={"48px auto 36px auto"}
        width={"100%"}
      >
        <div>
          <Typography variant="h4">POKEDEX</Typography>
          <TextField
            variant="outlined"
            placeholder="Buscar Pokemon"
            onChange={(e) => {
              filter(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
        </div>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{ color: "gray" }}
        >
          <Button
            variant={list ? "contained" : "outlined"}
            sx={{
              color: list ? "white" : "gray",
              background: list ? "gray" : "",
            }}
            onClick={setLayout}
            id="btn_list"
          >
            Lista
          </Button>
          <Button
            variant={!list ? "contained" : "outlined"}
            sx={{
              color: !list ? "white" : "gray",
              background: !list ? "gray" : "",
            }}
            onClick={setLayout}
            id="btn_grid"
          >
            Cuadricula
          </Button>
        </ButtonGroup>
      </Stack>
    </>
  );
};

export default MainAppBar;
