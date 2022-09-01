import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import LineChart from "../components/LineChart";

function Stats({
  watchlist,
  searchData,
  setWatchlist,
  removeWatchlist,
  tradeHistory,
}) {
  const round2DP = (num) => Math.round(num * 100) / 100;

  const addWatchList = () => {
    //can't add a collection thats already inside
    if (
      watchlist.find(
        (ele) =>
          ele.primary_asset_contracts[0] ===
          searchData.primary_asset_contracts[0]
      ) === undefined
    ) {
      setWatchlist([...watchlist, searchData]);
    }
  };

  // useEffect(() => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "X-API-KEY": "c745cde0-2b5d-4ad3-8b93-e77d77c56f3e",
  //     },
  //   };

  //   fetch(
  //     // `https://api.modulenft.xyz/api/v1/opensea/analytics/volume-history?type=${searchData?.primary_asset_contracts?.[0]?.address}&size=WEEK&since=2022-07-01T12%253A32%253A07-04%253A00`

  //     "https://api.modulenft.xyz/api/v1/opensea/analytics/volume-history?type=0xed5af388653567af2f388e6224dc7c4b3241c544&size=DAY&since=2022-07-01T12%253A32%253A07-04%253A00",
  //     {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "X-API-KEY": "c745cde0-2b5d-4ad3-8b93-e77d77c56f3e",
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((response) => console.log(response))
  //     .catch((err) => console.error(err));
  // }, []);

  return (
    <>
      <div className="bg-gray-700 h-screen ">
        <div className="drawer drawer-end ">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content ">
            {/* <!-- Page content here --> */}
            <div className="px-20 py-16 flex flex-col gap-10 relative ">
              <div className="relative shadow-gray-100 h-30 ">
                <img
                  className="rounded border-shadow-gray-500 shadow-lg shadow-gray-500 object-cover h-64 w-full bg-white"
                  src={searchData?.banner_image_url}
                />

                <div className="absolute left-5 bottom-0 py-2 px-1 shadow-xl ">
                  <img
                    className=" object-cover w-auto h-32 rounded-full border-solid border-2 border-slate-50 bg-white mb-2"
                    src={searchData?.image_url}
                  />
                  <p
                    className="font-poppins font-bold text-slate-50 text-4xl text-center bg-gray-900 bg-opacity-90
                  border-solid border-2 border-slate-50 rounded px-2 py-1"
                  >
                    {searchData?.name}
                  </p>
                </div>

                <div className="absolute right-2 bottom-2">
                  <button
                    onClick={addWatchList}
                    className="border-2 border-slate-600 border-solid rounded font-poppins bg-blue-900 p-2 transition ease-in-out hover:scale-105 font-semibold text-slate-50 hover:text-white hover:bg-blue-700"
                  >
                    + watchlist
                  </button>
                </div>
              </div>
              <div className="font-poppins text-white">
                <p>{searchData?.description}</p>
                <p>
                  Collection size:{" "}
                  <span>{searchData?.stats?.total_supply}</span>
                </p>
                <p>
                  Unique Owner: <span>{searchData?.stats?.num_owners}</span>
                </p>
                <p>
                  Average Price:{" "}
                  <span>{round2DP(searchData?.stats?.average_price)}</span>
                </p>
                <p>
                  Floor Price:{" "}
                  <span>{round2DP(searchData?.stats?.floor_price)}</span>
                </p>
                <p>
                  Market Cap:{" "}
                  <span>{round2DP(searchData?.stats?.market_cap)}</span>
                </p>
              </div>
              <div className="text-white border-2 border-slate-400  border-solid rounded p-2">
                <div className="flex justify-between">
                  <p>
                    1D Volume:{" "}
                    <span>{round2DP(searchData?.stats?.one_day_volume)}</span>
                  </p>
                  <p>
                    1D Change:{" "}
                    <span>
                      {round2DP(searchData?.stats?.one_day_change * 100)}%
                    </span>
                  </p>
                  <p>
                    1D Difference:{" "}
                    <span>
                      {round2DP(searchData?.stats?.one_day_difference)}
                    </span>
                  </p>
                  <p>
                    1D Avg Price:{" "}
                    <span>
                      {round2DP(searchData?.stats?.one_day_average_price)}
                    </span>
                  </p>
                  <p>
                    1D Sales: <span>{searchData?.stats?.one_day_sales}</span>
                  </p>
                </div>
                <div className="flex justify-between ">
                  <p>
                    7D Volume:{" "}
                    <span>{round2DP(searchData?.stats?.seven_day_volume)}</span>
                  </p>
                  <p>
                    7D Change:{" "}
                    <span>
                      {round2DP(searchData?.stats?.seven_day_change * 100)}%
                    </span>
                  </p>
                  <p>
                    7D Difference:{" "}
                    <span>
                      {round2DP(searchData?.stats?.seven_day_difference)}
                    </span>
                  </p>
                  <p>
                    7D Avg Price:{" "}
                    <span>
                      {round2DP(searchData?.stats?.seven_day_average_price)}
                    </span>
                  </p>
                  <p>
                    7D Sales: <span>{searchData?.stats?.seven_day_sales}</span>
                  </p>
                </div>
                <div className="flex justify-between ">
                  <p>
                    30D Volume:{" "}
                    <span>
                      {round2DP(searchData?.stats?.thirty_day_volume)}
                    </span>
                  </p>
                  <p>
                    30D Change:{" "}
                    <span>
                      {round2DP(searchData?.stats?.thirty_day_change * 100)}%
                    </span>
                  </p>
                  <p>
                    30D Difference:{" "}
                    <span>
                      {round2DP(searchData?.stats?.thirty_day_difference)}
                    </span>
                  </p>
                  <p>
                    30D Avg Price:{" "}
                    <span>
                      {round2DP(searchData?.stats?.thirty_day_average_price)}
                    </span>
                  </p>
                  <p>
                    30D Sales:{" "}
                    <span>{searchData?.stats?.thirty_day_sales}</span>
                  </p>
                </div>
              </div>

              <div id="linechart">
                <h2 className="text-2xl font-semibold text-white pb-5">
                  Lastest Trade on Opensea
                </h2>
                <LineChart tradeHistory={tradeHistory} />
              </div>
              <label
                htmlFor="my-drawer-4"
                className="drawer-button btn btn-outline absolute btn-info right-10 top-2 mb-5 fixed"
              >
                Open Watchlist
              </label>
            </div>
          </div>

          <div className="drawer-side">
            <label
              htmlFor="my-drawer-4"
              className="drawer-overlay overflow-hidden"
            ></label>
            <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
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

export default Stats;
