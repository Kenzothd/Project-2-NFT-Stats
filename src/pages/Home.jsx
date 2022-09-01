import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LineChart from "../components/LineChart";
import Sidebar from "../components/Sidebar";

function Home({ fetchSearch, tradeHistory }) {
  let navigate = useNavigate();

  /////////////////////////*State*/////////////////////////
  const [topCollectionStats, setTopCollectionStats] = useState([]);
  const [volume, setVolume] = useState("one_day_volume");
  const [sort, setSort] = useState("up");

  const round2DP = (num) => Math.round(num * 100) / 100;

  const tbody = (volume, a = 0, b = 10, c = 1) => {
    return topCollectionStats?.slice(a, b).map((ele, i) => (
      <tr
        key={ele?.created_date}
        onClick={() => {
          fetchSearch(ele?.slug);
          navigate("../stats");
        }}
        className="border border-black border-solid cursor-pointer transition ease-in-out hover:scale-110"
      >
        <td>{c + i}</td>
        <td className="flex items-center gap-5 pl-10 ">
          <img
            src={ele?.image_url}
            className="w-20 h-20 ml-1 border rounded-lg"
          />
          <p className="text-align justify-center">{ele?.name}</p>
        </td>
        <td>
          {round2DP(ele?.stats?.floor_price) !== 0
            ? round2DP(ele?.stats?.floor_price)
            : "-"}
        </td>
        <td>{round2DP(ele?.stats?.[volume])}</td>
        <td className="">
          <span>
            {round2DP(
              (ele?.stats?.num_owners / ele?.stats?.total_supply) * 100
            )}
            %
          </span>
          <p>
            {ele?.stats?.num_owners}/{ele?.stats?.total_supply}
          </p>
        </td>
      </tr>
    ));
  };
  /////////////////////////////////////////////////////////////

  ///////////////////*Fetch Top Collections*//////////////////
  const fetchTopCollection = (Vol, volume = "one_day_volume") => {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-KEY": "c745cde0-2b5d-4ad3-8b93-e77d77c56f3e",

        "x-bypass-cache": true,
      },
    };
    fetch(
      `https://api.modulenft.xyz/api/v1/opensea/collection/rankings?sort_by=${Vol}&count=30&offset=0`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        const topCollections = data?.rankings?.map(
          (ele) => ele?.collection_slug
        );
        // console.log("X top collections", topCollections);
        ////////*Fetch Top Collections STATS*///////
        const options = {
          method: "GET",
          headers: { Accept: "application/json" },
        };

        let requests = topCollections.map((ele) =>
          fetch(`https://api.opensea.io/api/v1/collection/${ele}/`, options)
        );
        // console.log("request", requests);

        Promise.all(requests)
          .then((responses) => Promise.all(responses.map((r) => r.json())))
          .then((datas) => {
            const arrayVolumeSort = datas.sort(
              (a, b) =>
                b?.collection?.stats?.[volume] - a?.collection?.stats?.[volume]
            );
            const collectionsStats = arrayVolumeSort?.map(
              (ele) => ele?.collection
            );
            setTopCollectionStats(collectionsStats);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  //default home page
  useEffect(() => {
    fetchTopCollection("ONE_DAY_VOLUME");
  }, []);
  // console.log("top collection stats", topCollectionStats);

  /////////////////////////////////////////////////////////////

  /////////////////////////*Handler*//////////////////////

  const handlerSort = (param) => {
    switch (sort) {
      case "up":
        const arrayHightoLow = topCollectionStats?.sort(
          (a, b) => b?.stats?.[param] - a?.stats?.[param]
        );
        setTopCollectionStats([...arrayHightoLow]);
        setSort("down");
        break;

      case "down":
        const arrayLowToHigh = topCollectionStats?.sort(
          (a, b) => a?.stats?.[param] - b?.stats?.[param]
        );
        setTopCollectionStats([...arrayLowToHigh]);
        setSort("up");
        break;
    }
  };

  const handlerVol = (event) => {
    switch (event.target.innerText) {
      case "1D":
        fetchTopCollection("ONE_DAY_VOLUME", "one_day_volume");
        setVolume("one_day_volume");
        break;
      case "7D":
        fetchTopCollection("SEVEN_DAY_VOLUME", "seven_day_volume");
        setVolume("seven_day_volume");
        break;
      case "30D":
        fetchTopCollection("THIRTY_DAY_VOLUME", "thirty_day_volume");
        setVolume("thirty_day_volume");
        break;
    }
  };

  /////////////////////////////////////////////////////////////

  return (
    <>
      <div className="px-10 py-20 flex flex-col gap-32 relative bg-gray-800">
        <div className="text-center italic">
          <p className="text-6xl font-bold text-white">
            Best <span className="text-blue-600 ">NFT</span> Stats Tool
          </p>
          <p className="text-6xl font-bold text-white">
            {" "}
            with Real-Time NFT Data
          </p>
        </div>

        <div className="mx-48">
          <div className="carousel carousel-center w11/12 bg-white  rounded-box text-center space-x-10 px-10 ">
            <div id="slide1" className="carousel-item relative w-full">
              <div className="text-center mx-auto py-10">
                <p className="text-5xl font-bold text-black mb-10">
                  Top Collections
                </p>
                <div className="text-white flex items-center justify-center pb-5">
                  <p className="font-semibold text-black text-xl">Volume: </p>
                  <button
                    onClick={handlerVol}
                    className="font-semibold text-white border-solid border-2 border-black p-1 px-2 m-2 w-16 bg-slate-500 bg-opacity-90 rounded hover:bg-slate-400"
                  >
                    1D
                  </button>
                  <button
                    onClick={handlerVol}
                    className="font-semibold text-white border-solid border-2 border-black p-1 px-2 m-2 w-16 bg-slate-500 bg-opacity-90 rounded hover:bg-slate-400"
                  >
                    7D
                  </button>
                  <button
                    onClick={handlerVol}
                    className="font-semibold text-white border-solid border-2 border-black p-1 px-2 m-2 w-16 bg-slate-500 bg-opacity-90 rounded hover:bg-slate-400"
                  >
                    30D
                  </button>
                </div>
                <table className="border-separate border-spacing-x-4 table-auto">
                  <thead>
                    <tr className="p-2 text-lg ">
                      <th> </th>
                      <th>Collection</th>
                      <th>
                        Floor Price
                        <button
                          onClick={() => handlerSort("floor_price")}
                          className="border-solid border-2 rounded border-black"
                        >
                          sort
                        </button>
                      </th>
                      <th>
                        Volume
                        <button
                          onClick={() => handlerSort(volume)}
                          className="border-solid border-2 rounded border-black"
                        >
                          sort
                        </button>
                      </th>
                      <th>Unique Owner(%)</th>
                    </tr>
                  </thead>

                  <tbody>{tbody(volume)}</tbody>
                </table>
                <p className="font-semibold">page-1</p>
              </div>
              <div className="">
                <a
                  href="#slide2"
                  className=" absolute btn btn-circle transform-y-1/2  top-1/2 left-0"
                >
                  ❮
                </a>
                <a
                  href="#slide2"
                  className="absolute btn btn-circle tranform-y-1/2 top-1/2 right-0"
                >
                  ❯
                </a>
              </div>
            </div>

            <div id="slide2" className="carousel-item relative w-full">
              <div className="text-center mx-auto py-10">
                <p className="text-5xl font-bold text-black mb-10">
                  Top Collections
                </p>
                <div className="text-white flex items-center justify-center pb-5">
                  <p className="font-semibold text-black text-xl">Volume: </p>
                  <button
                    onClick={handlerVol}
                    className="font-semibold text-white border-solid border-2 border-black p-1 px-2 m-2 w-16 bg-slate-500 bg-opacity-90 rounded hover:bg-slate-400"
                  >
                    1D
                  </button>
                  <button
                    onClick={handlerVol}
                    className="font-semibold text-white border-solid border-2 border-black p-1 px-2 m-2 w-16 bg-slate-500 bg-opacity-90 rounded hover:bg-slate-400"
                  >
                    7D
                  </button>
                  <button
                    onClick={handlerVol}
                    className="font-semibold text-white border-solid border-2 border-black p-1 px-2 m-2 w-16 bg-slate-500 bg-opacity-90 rounded hover:bg-slate-400"
                  >
                    30D
                  </button>
                </div>
                <table className="border-separate border-spacing-x-4 ">
                  <thead>
                    <tr className="p-2 text-lg ">
                      <th> </th>
                      <th>Collection</th>
                      <th>
                        Floor Price
                        <button
                          onClick={() => handlerSort("floor_price")}
                          className="border-solid border-2 rounded border-black"
                        >
                          sort
                        </button>
                      </th>
                      <th>
                        Volume
                        <button
                          onClick={() => handlerSort(volume)}
                          className="border-solid border-2 rounded border-black"
                        >
                          sort
                        </button>
                      </th>
                      <th>Unique Owner(%)</th>
                    </tr>
                  </thead>

                  <tbody>{tbody(volume, 10, 20, 11)}</tbody>
                </table>
                <p className="font-semibold">page-2</p>
              </div>

              <div className="">
                <a
                  href="#slide1"
                  className="btn btn-circle absolute btn btn-circle transform-y-1/2  top-1/2 left-0"
                >
                  ❮
                </a>
                <a
                  href="#slide1"
                  className="btn btn-circle absolute btn btn-circle transform-y-1/2  top-1/2 right-0"
                >
                  ❯
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-56">
          <p className="font-bold text-white text-5xl text-center my-20 italic">
            Track your Favourite Collection
          </p>
          <p className="font-bold text-xl">
            Get the Lastest Transaction of Collection From Opensea
          </p>
          <LineChart tradeHistory={tradeHistory} />
        </div>

        <div className="mx-56 text-center">
          <p className="font-bold text-white text-5xl text-center my-20 italic">
            Add Favourite Collection to Watchlist
          </p>
          <div className="flex gap-10 justify-center">
            <img
              src="../src/assets/img/Watchlist_1.png "
              className="h-72 transition ease-in-out hover:scale-125 cursor-zoom-in"
            />
            <img
              src="../src/assets/img/Watchlist_2.png"
              className="h-72 w-60 transition ease-in-out hover:scale-150 cursor-zoom-in"
            />
          </div>
          <img
            src="../src/assets/img/Watchlist_3.png"
            className=" w-11/12 object-cover transition ease-in-out hover:scale-125 cursor-zoom-in mx-auto p-10 mt-20"
          />
        </div>

        <div className="mx-56 text-center">
          <p className="font-bold text-white text-5xl text-center my-10 italic">
            Search for Collection Slug
          </p>

          <img
            src="../src/assets/img/Search_Slug2.png"
            className=" w-1/2 object-cover transition ease-in-out hover:scale-105 cursor-zoom-in mx-auto mt-10"
          />
          <img
            src="../src/assets/img/Search_Slug.png"
            className="transition ease-in-out hover:scale-125 cursor-zoom-in mx-auto p-10"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
