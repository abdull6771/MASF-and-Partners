import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Privacy-friendly analytics (Plausible), enabled only when
// VITE_PLAUSIBLE_DOMAIN is set — see frontend/.env.example.
const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
if (plausibleDomain) {
  const script = document.createElement("script");
  script.defer = true;
  script.dataset.domain = plausibleDomain;
  script.src = import.meta.env.VITE_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.js";
  document.head.appendChild(script);
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
