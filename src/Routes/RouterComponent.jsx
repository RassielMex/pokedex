import React from "react";
import Detail from "../Layouts/Detail";
import Main from "../Layouts/Main";
import Login from "../Layouts/Login";
import { createBrowserRouter } from "react-router-dom";
import RequiresLogin from "./Guard/RequiresLogin";

export const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequiresLogin>
        <Main />
      </RequiresLogin>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path: "detail/:id", element: <Detail /> },
  { path: "*", element: <>Ooops! algo salió mal</> },
]);
