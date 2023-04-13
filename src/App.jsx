import React from "react";
import { Routes, Route } from "react-router-dom";
import Compliments from "./components/Compliments content/Compliments";
import NewCompliment from "./components/newCompliment/NewCompliment";
import AuthPage from "./components/authorization/AuthPage";
import AdminPage from "./components/receivedTexts/AdminPage";
import "./app.scss";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Compliments />} />
      <Route path="/addcompliment" element={<NewCompliment />} />
      <Route path="/authpage" element={<AuthPage />} />
      <Route path="/adminpage" element={<AdminPage />} />
    </Routes>
  );
};

export default App;
