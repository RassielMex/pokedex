import React from "react";
import { Navigate } from "react-router-dom";

const RequiresLogin = (props) => {
  const loggedIn = sessionStorage.getItem("logged");
  if (loggedIn) {
    return props.children;
  }
  return <Navigate to={"login"} replace="true" />;
};

export default RequiresLogin;
