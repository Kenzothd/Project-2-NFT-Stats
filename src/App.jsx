import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Watchlist from "./pages/Watchlist";

function App() {
  const [searchData, setSearchData] = useState({});
  const [watchlist, setWatchlist] = useState([]);

  const round2DP = (num) => Math.round(num * 100) / 100;

  const fetchSearch = (searchInput) => {
    const options = { method: "GET", headers: { Accept: "application/json" } };

    fetch(`https://api.opensea.io/api/v1/collection/${searchInput}`, options)
      ?.then((response) => response.json())
      ?.then((data) => {
        setSearchData(data.collection);
      })
      ?.catch((err) => console.error(err));
  };

  console.log(watchlist);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navbar fetchSearch={fetchSearch} setSearchData={setSearchData} />
          }
        >
          <Route
            index
            element={<Home watchlist={watchlist} fetchSearch={fetchSearch} />}
          />
          <Route
            path="/home"
            element={
              <Home
                watchlist={watchlist}
                fetchSearch={fetchSearch}
                round2DP={round2DP}
              />
            }
          />
          <Route
            path="/stats"
            element={
              <Stats
                setWatchlist={setWatchlist}
                watchlist={watchlist}
                searchData={searchData}
                round2DP={round2DP}
              />
            }
          />
          {/* <Route path="APIs" element={<APIs />} /> */}
          <Route
            path="/watchlist"
            element={
              <Watchlist
                watchlist={watchlist}
                setWatchlist={setWatchlist}
                round2DP={round2DP}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
