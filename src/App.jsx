import { useContext } from "react";
import { AuthContext } from "./context/useContext";
import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Compliments from "./components/Compliments content/Compliments";
import NewCompliment from "./components/newCompliment/NewCompliment";
import AuthPage from "./components/authorization/AuthPage";
import AdminPage from "./components/adminpage/AdminPage";
import "./app.scss";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Compliments />} />
      <Route path="/addcompliment" element={<NewCompliment />} />
      <Route path="/authpage" element={<AuthPage />} />
      <Route
        path="/adminpage"
        element={isAuthenticated ? <AdminPage /> : <Navigate to="/authpage" />}
      />
    </Routes>
  );
};

export default App;
