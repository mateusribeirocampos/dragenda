import { createRoot } from "react-dom/client";
import "./styles/global.css";
import Rotas from "./rotas.jsx";

createRoot(document.getElementById("root")).render(
  <div>
    <Rotas />
  </div>
);
