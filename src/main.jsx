import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./context/CartContext.jsx";
import { UiProvider } from "./context/UiContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UiProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </UiProvider>
);
