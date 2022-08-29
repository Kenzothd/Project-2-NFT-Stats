import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import Home from "./pages/Home";

function App() {
  const [searchData, setSearchData] = useState();

  const fetchSearch = (searchInput) => {
    const options = { method: "GET", headers: { Accept: "application/json" } };

    fetch(`https://api.opensea.io/api/v1/collection/${searchInput}`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSearchData(data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar fetchSearch={fetchSearch} />}>
          {/* <Route
            path="/"
            element={<Search searchData={searchData?.collection} />}
          /> */}
          <Route path="/" element={<Home />} />
          {/* <Route path="APIs" element={<APIs />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
