import React from "react";
import { createRoot } from "react-dom/client";
import VisakhaLandingPage from "./VisakhaLandingPage.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <VisakhaLandingPage />
  </React.StrictMode>,
);
