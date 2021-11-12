import { Home, Scan } from "pages";
import React from "react";
import { positions, Provider as AlertProvider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import ReactDOM from "react-dom";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "./styles/main.scss";

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 2300,
  offset: "100px",
  transition: transitions.FADE,
};

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="scan" element={<Scan />} />
        </Routes>
      </MemoryRouter>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
