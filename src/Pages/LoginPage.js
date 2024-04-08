import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginHome from "../components/Login/LoginHome";

const LoginPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginHome />} />
      </Routes>
    </div>
  );
};

export default LoginPage;
