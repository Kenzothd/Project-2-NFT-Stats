import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          {/* <Route path="/" element={<Home />} />
          <Route path="APIs" element={<APIs />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
