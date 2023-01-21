import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Watchlist from "./pages/Watchlist";
import TopMarketCap from "./pages/TopMarketCap";

function App() {
  const [searchData, setSearchData] = useState({});
  const [tradeHistory, setTradeHistory] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearch = (searchInput) => {
    setLoading(true);
    const options = { method: "GET", headers: { Accept: "application/json" } };

    fetch(`https://api.opensea.io/api/v1/collection/${searchInput}`, options)
      ?.then((response) => response.json())
      ?.then((data) => {
        setSearchData(data?.collection);

        const options = {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-API-Key":
              "Im6egiFrpizkUoiydWVBFC4aSc9s4W6mffarvWRk7aGX5JW1NPLoTDHJhdHy4ink",
          },
        };

        console.log(data?.collection?.primary_asset_contracts?.[0]?.address);

        fetch(
          `https://deep-index.moralis.io/api/v2/nft/${data?.collection?.primary_asset_contracts?.[0]?.address}/trades?chain=eth&marketplace=opensea`,
          options
        )
          .then((response) => response.json())
          .then((data) => {
            //*Map and set trade history[{date, price, datewithtime}]*//
            const filteredData = data?.result?.map((ele) => {
              let price =
                Math.round(ele?.price * Math.pow(10, -18) * 100) / 100;
              return {
                dateTimeNum: ele.block_timestamp
                  .split("")
                  .slice(0, 19)
                  .filter((ele) => ele !== "-" && ele !== "T" && ele !== ":")
                  .join(""),
                price,
                dateWithTime: ele.block_timestamp
                  .split("")
                  .slice(0, 19)
                  .join(""),
              };
            });

            //sort the date in ascending order(least recent to most recent)
            filteredData?.sort((a, b) => Number(a.dateTimeNum - b.dateTimeNum));

            setTradeHistory(filteredData);
            setLoading(false);
          })
          .catch((err) => console.error(err));
      })
      ?.catch((err) => console.error(err));
  };

  const removeWatchlist = (event) => {
    const newArray = watchlist.filter((ele) => ele.name !== event.target.value);
    setWatchlist([...newArray]);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Navbar fetchSearch={fetchSearch} searchData={searchData} />
            }
          >
            <Route
              index
              element={
                <Home
                  fetchSearch={fetchSearch}
                  tradeHistory={tradeHistory}
                  setLoading={setLoading}
                  loading={loading}
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
                  removeWatchlist={removeWatchlist}
                  tradeHistory={tradeHistory}
                  loading={loading}
                />
              }
            />
            <Route path="/topmarketcap" element={<TopMarketCap />} />
            <Route
              path="/watchlist"
              element={
                <Watchlist
                  watchlist={watchlist}
                  removeWatchlist={removeWatchlist}
                  fetchSearch={fetchSearch}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
