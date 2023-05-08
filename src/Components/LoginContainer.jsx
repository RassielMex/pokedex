import { Button, FormGroup, Stack, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const LoginContainer = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    sessionStorage.setItem("logged", true);
    navigate("/", { replace: true });
  };

  //Formik config
  const initialValues = {
    email: "",
    password: "",
  };

  const required = "Este campo es obligatorio";
  const invalidMail = "Introduzca un email válido";

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(invalidMail).required(required),
    password: Yup.string().required(required),
  });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, handleBlur, errors, touched } = formik;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack maxWidth={300} spacing={2} alignItems={"center"}>
          <Typography variant="h5" sx={{ color: "gray" }}>
            POKEDEX
          </Typography>
          <FormGroup>
            <TextField
              variant="outlined"
              name="email"
              type="email"
              placeholder="Correo Electronico"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <Typography sx={{ color: "red" }}>{errors.email}</Typography>
            )}
          </FormGroup>{" "}
          <FormGroup>
            <TextField
              variant="outlined"
              type="password"
              name="password"
              placeholder="Contraseña"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <Typography sx={{ color: "red" }}>{errors.password}</Typography>
            )}
          </FormGroup>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "gray", width: "200px" }}
          >
            Iniciar Sesion
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default LoginContainer;
