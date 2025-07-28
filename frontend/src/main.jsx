import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Login from "./screens/auth/Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="auth/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
