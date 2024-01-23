import React from "react";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

const PrivateRoute = ({ children }) => {

  const token = localStorage.getItem("token");
  if (token !== null) {
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
