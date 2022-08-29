import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import Home from "./pages/Home";

function App() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar setSearchInput={setSearchInput} />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/search"
            element={<Search searchInput={searchInput} />}
          />
          {/* <Route path="APIs" element={<APIs />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
