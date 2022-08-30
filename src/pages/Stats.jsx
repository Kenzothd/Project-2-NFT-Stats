import { useState, useEffect } from "react";

function Stats({ watchlist, searchData, setWatchlist }) {
  const [history, setHistory] = useState({});

  console.log(searchData?.primary_asset_contracts?.[0]?.address);

  const addWatchList = () => {
    setWatchlist([...watchlist, searchData]);
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
      <div className="px-20 py-5 flex flex-col gap-10 ">
        <div className="relative shadow-gray-100 h-30 ">
          <img
            className="rounded border-shadow-gray-500 shadow-xl shadow-gray-400 object-cover h-52 w-full"
            src={searchData?.banner_image_url}
          />

          <div className="absolute left-5 bottom-0 py-2 px-1 shadow-xl">
            <img
              className=" object-cover w-auto h-24 rounded-full border-solid border-2 border-slate-50 bg-white"
              src={searchData?.image_url}
            />
            <p className="font-poppins font-bold text-slate-50 text-4xl text-center bg-blue-500 rounded bg-opacity-20 ">
              {searchData?.name}
            </p>
          </div>

          <div className="absolute right-2 bottom-2">
            <button
              onClick={addWatchList}
              className="border-2 border-slate-600 border-solid rounded font-poppins bg-slate-100 p-1 transition ease-in-out hover:scale-105 font-semibold"
            >
              + watchlist
            </button>
          </div>
        </div>
        <div className="font-poppins">
          <p>{searchData?.description}</p>
          <p>
            Collection size:<span>{searchData?.stats?.total_supply}</span>
          </p>
          <p>
            Unique Owner:<span>{searchData?.stats?.num_owners}</span>
          </p>
          <p>
            Average Price:<span>{searchData?.stats?.average_price}</span>
          </p>
          <p>
            Floor Price:<span>{searchData?.stats?.floor_price}</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Stats;
