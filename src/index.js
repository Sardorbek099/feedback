import React from "react";
import ReactDOM from "react-dom/client"; // ⚠️ diqqat
import App from "./App";
import '../index.css';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
      <App />
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
