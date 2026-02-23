import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider
    clientId="517400856913-nqur08o1nhl1ke7ugmb8alttot2tkb1r.apps.googleusercontent.com"
    key="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"
  >
    <App />
  </GoogleOAuthProvider>,
);
