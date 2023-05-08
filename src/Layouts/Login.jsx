import React from "react";
import LoginContainer from "../Components/LoginContainer";
import { Stack } from "@mui/material";
import { Navigate } from "react-router-dom";

const Login = () => {
  const logged = sessionStorage.getItem("logged");

  return (
    <>
      {logged ? (
        <Navigate to={"/"} replace></Navigate>
      ) : (
        <Stack alignItems={"center"} justifyContent={"center"} height={"100vh"}>
          <LoginContainer />
        </Stack>
      )}
    </>
  );
};

export default Login;
