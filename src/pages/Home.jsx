import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Home({ watchlist, fetchSearch, removeWatchlist }) {
  let navigate = useNavigate();

  /////////////////////////*State*/////////////////////////
  const [topCollectionStats, setTopCollectionStats] = useState([]);
  const [volume, setVolume] = useState("one_day_volume");
  const [sort, setSort] = useState("up");

  const round2DP = (num) => Math.round(num * 100) / 100;

  const Tbody = ({ volume }) => {
    return topCollectionStats?.map((ele, i) => (
      <tr
        key={ele?.created_date}
        onClick={() => {
          fetchSearch(ele?.slug);
          navigate("../stats");
        }}
        className="border-2 border-black border-solid cursor-pointer transition ease-in-out hover:scale-110 "
      >
        <td>{i + 1}</td>
        <td className="flex items-center gap-5 pl-10 ">
          <img src={ele?.image_url} className="w-20 h-20 ml-1" />
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
      `https://api.modulenft.xyz/api/v1/opensea/collection/rankings?sort_by=${Vol}&count=10&offset=0`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        const topCollections = data?.rankings?.map(
          (ele) => ele?.collection_slug
        );
        console.log(topCollections);
        ////////*Fetch Top Collections STATS*///////
        const options = {
          method: "GET",
          headers: { Accept: "application/json" },
        };

        let requests = topCollections.map((ele) =>
          fetch(`https://api.opensea.io/api/v1/collection/${ele}/`, options)
        );
        console.log(requests);

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
  console.log(topCollectionStats);

  /////////////////////////////////////////////////////////////

  /////////////////////////*Handler*//////////////////////

  const handlerFPSort = () => {
    switch (sort) {
      case "up":
        const arrayFloorSort = topCollectionStats.sort(
          (a, b) => a.stats.floor_price - b.stats.floor_price
        );
        setTopCollectionStats([...arrayFloorSort]);
        Tbody(volume);
        setSort("down");
        break;

      case "down":
        const arrayReverse = topCollectionStats.reverse();
        setTopCollectionStats([...arrayReverse]);
        Tbody(volume);
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
      <div className="bg-gray-800 h-screen">
        <div className="drawer drawer-end">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* <!-- Page content here --> */}
            <div className="px-10 py-16 flex flex-col gap-10 relative ">
              <div className="text-center flex flex-col gap-10">
                <p className="text-6xl font-bold text-white">
                  Best <span className="text-blue-600 italic">NFT</span> Stats
                  Tool
                </p>

                <p className="text-5xl font-bold text-white ">
                  Top Collections
                </p>

                <div>
                  <button
                    onClick={handlerVol}
                    className="border-solid border-2 border-black p-1 px-2 m-2 rounded bg-slate-300 hover:bg-slate-200"
                  >
                    1D
                  </button>
                  <button
                    onClick={handlerVol}
                    className="border-solid border-2 border-black p-1 px-2 m-2 rounded bg-slate-300 hover:bg-slate-200"
                  >
                    7D
                  </button>
                  <button
                    onClick={handlerVol}
                    className="border-solid border-2 border-black p-1 px-2 m-2 rounded bg-slate-300 hover:bg-slate-200"
                  >
                    30D
                  </button>
                </div>
              </div>

              <div className="mx-48">
                <div className="carousel carousel-center w11/12 bg-white rounded-box text-center space-x-10 px-10 ">
                  <div id="slide1" className="carousel-item relative w-full">
                    <div className="text-center mx-auto py-10">
                      <table className="border-separate border-spacing-x-4 ">
                        <thead>
                          <tr className="p-2 text-lg ">
                            <th> </th>
                            <th>Collection</th>
                            <th>
                              Floor Price
                              <button
                                onClick={handlerFPSort}
                                className="border-solid border-2 rounded border-black"
                              >
                                sort
                              </button>
                            </th>
                            <th>Volume</th>
                            <th>Unique Owner(%)</th>
                          </tr>
                        </thead>

                        <tbody>
                          <Tbody volume={volume} />
                        </tbody>
                      </table>
                    </div>
                    <div className="">
                      <a
                        href="#slide2"
                        className=" absolute btn btn-circle transform-y-1/2  top-1/2 left-5"
                      >
                        ❮
                      </a>
                      <a
                        href="#slide2"
                        className="absolute btn btn-circle tranform-y-1/2 top-1/2 right-5"
                      >
                        ❯
                      </a>
                    </div>
                  </div>
                  <div id="slide2" className="carousel-item relative w-full">
                    <div className="text-center mx-auto py-10">
                      <img
                        src="https://placeimg.com/800/200/arch"
                        className="w-full"
                      />
                    </div>
                    <div className="">
                      <a
                        href="#slide1"
                        className="btn btn-circle absolute btn btn-circle transform-y-1/2  top-1/2 left-5"
                      >
                        ❮
                      </a>
                      <a
                        href="#slide1"
                        className="btn btn-circle absolute btn btn-circle transform-y-1/2  top-1/2 right-5"
                      >
                        ❯
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <label
                htmlFor="my-drawer-4"
                className="drawer-button btn btn-outline btn-info absolute right-10 bottom-0"
              >
                Open Watchlist
              </label>
            </div>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
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

export default Home;
