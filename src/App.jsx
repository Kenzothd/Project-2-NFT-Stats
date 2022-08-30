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

  const fetchSearch = (searchInput) => {
    const options = { method: "GET", headers: { Accept: "application/json" } };

    fetch(`https://api.opensea.io/api/v1/collection/${searchInput}`, options)
      ?.then((response) => response.json())
      ?.then((data) => {
        setSearchData(data.collection);
      })
      ?.catch((err) => console.error(err));
  };

  const removeWatchlist = (event) => {
    const newArray = watchlist.filter((ele) => ele.name !== event.target.value);
    setWatchlist([...newArray]);
  };

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
                removeWatchlist={removeWatchlist}
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
              />
            }
          />
          {/* <Route path="APIs" element={<APIs />} /> */}
          <Route
            path="/watchlist"
            element={
              <Watchlist
                watchlist={watchlist}
                removeWatchlist={removeWatchlist}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
