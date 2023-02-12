//Importación de los archivos para poder ejecutar el react de manera local 
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./App";
//Empieza a llamar a las funciones de la app
const root = createRoot(document.getElementById("root"));
//Llama al render para poder mostrarlo en el index principal
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);