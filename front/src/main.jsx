import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AppRouter from "./router";
import "./style.css";
import { AuthProvider } from "./contexts/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>
);
