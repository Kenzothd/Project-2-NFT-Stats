import { useEffect, useState } from "react";
import TMCTreemap from "../components/Treemap";
import Sidebar from "../components/Sidebar";

function TopMarketCap({ watchlist, removeWatchlist }) {
  const [top100Collections, setTop100Collections] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-KEY": "c745cde0-2b5d-4ad3-8b93-e77d77c56f3e",

        "x-bypass-cache": true,
      },
    };

    fetch(
      "https://api.modulenft.xyz/api/v1/opensea/collection/rankings?sort_by=ONE_DAY_VOLUME&count=100&offset=0",
      options
    )
      .then((response) => response.json())
      .then((data) => setTop100Collections(data?.rankings))
      .catch((err) => console.error(err));
  }, []);

  console.log(top100Collections);

  return (
    <>
      <div className="bg-gray-800 h-screen">
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content relative">
            {/* <!-- Page content here --> */}
            <div className="mx-20 mt-12 h-5/6 text-white">
              <h1 className=" mb-5 ">
                <span className="text-3xl font-bold">Top 100 Market Cap</span>
                <span className="text-md ">(Floor price * Total supply)</span>
              </h1>

              <TMCTreemap top100Collections={top100Collections} />
            </div>

            <label
              htmlFor="my-drawer-4"
              className="drawer-button btn btn-outline btn-info absolute right-10 top-2 fixed"
            >
              Open Watchlist
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content ">
              {/* <!-- Sidebar content here --> */}
              <Sidebar
                watchlist={watchlist}
                removeWatchlist={removeWatchlist}
              />
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopMarketCap;
