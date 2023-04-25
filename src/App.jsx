import { useContext } from "react";
import { AuthContext } from "./context/useContext";
import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Quote from "./components/Compliments content/Quote";
import NewCompliment from "./components/newCompliment/NewCompliment";
import AuthPage from "./components/authorization/AuthPage";
import AdminPage from "./components/adminpage/AdminPage";
import { AUTH_PROPS } from "../public/services/constants/constants";
import "./app.scss";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const token = localStorage.getItem(AUTH_PROPS);

  return (
    <Routes>
      <Route path="/" element={<Quote />} />
      <Route path="/addcompliment" element={<NewCompliment />} />
      <Route
        path="/authpage"
        element={token ? <Navigate to="/adminpage" /> : <AuthPage />}
      />
      <Route
        path="/adminpage"
        element={isAuthenticated ? <AdminPage /> : <Navigate to="/authpage" />}
      />
    </Routes>
  );
};

export default App;
