import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Home({ watchlist, fetchSearch, round2DP }) {
  let navigate = useNavigate();
  /////////////////////////*State*/////////////////////////
  const [topCollectionStats, setTopCollectionStats] = useState([]);
  const [volume, setVolume] = useState("one_day_volume");
  const [sort, setSort] = useState("up");

  const Tbody = ({ volume }) => {
    return topCollectionStats?.map((ele, i) => (
      <tr
        onClick={() => {
          fetchSearch(ele?.slug);
          navigate("../stats");
        }}
        className="cursor-pointer transition ease-in-out hover:scale-110 "
      >
        <td key={ele?.created_date}>{i + 1}</td>
        <td className="flex items-center gap-5 pl-10 ">
          <img src={ele?.image_url} className="w-12 h-12 ml-1" />
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

  /////////////////*Fetch Top Collections STATS*///////////////
  // const arrayData = [];
  // const fetchStats = (param) => {
  //   const options = { method: "GET", headers: { Accept: "application/json" } };

  //   fetch(`https://api.opensea.io/api/v1/collection/${param}/`, options)
  //     .then((response) => response?.json())
  //     .then(
  //       (data) => data
  //       // setTopCollectionStats([...topCollectionStats, data]);
  //       // arrayData.push(data);
  //       // console.log(arrayData);
  //     )
  //     .catch((err) => console.error(err));
  // };
  ////////////////////////////////////////////////////////////

  ///////////////////*Fetch Top Collections*//////////////////
  const fetchTopCollection = (volume) => {
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-KEY": "c745cde0-2b5d-4ad3-8b93-e77d77c56f3e",
      },
    };
    fetch(
      `https://api.modulenft.xyz/api/v1/opensea/collection/rankings?sort_by=${volume}&count=10&offset=0`,
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
            const collectionsStats = datas.map((ele) => ele.collection);
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
        const arraySort = topCollectionStats.sort(
          (a, b) => a.stats.floor_price - b.stats.floor_price
        );
        setTopCollectionStats([...arraySort]);
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
      case "24H":
        fetchTopCollection("ONE_DAY_VOLUME");
        setVolume("one_day_volume");
        break;
      case "7D":
        fetchTopCollection("SEVEN_DAY_VOLUME");
        setVolume("seven_day_volume");
        break;
      case "1M":
        fetchTopCollection("THIRTY_DAY_VOLUME");
        setVolume("thirty_day_volume");
        break;
    }
  };

  /////////////////////////////////////////////////////////////

  return (
    <>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* <!-- Page content here --> */}
          <div className="px-10">
            <div className="text-center">
              <button
                onClick={handlerVol}
                className="border-solid border-2 border-black p-1 px-2 m-2 rounded bg-slate-300 hover:bg-slate-200"
              >
                24H
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
                1M
              </button>
            </div>

            <div className="carousel carousel-center w-full  bg-white rounded-box text-center space-x-10 px-10">
              <div id="slide1" className="carousel-item relative w-full">
                <div className="text-center mx-auto py-10">
                  <table className="gap-10">
                    <thead>
                      <tr>
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
                        <th>% Unique Owner</th>
                      </tr>
                    </thead>

                    <tbody>
                      <Tbody volume={volume} />
                    </tbody>
                  </table>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide4" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide2" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
              <div id="slide2" className="carousel-item relative w-full">
                <img
                  src="https://placeimg.com/800/200/arch"
                  className="w-full"
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide1" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide3" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
              <div id="slide3" className="carousel-item relative w-full">
                <img
                  src="https://placeimg.com/800/200/arch"
                  className="w-full"
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide2" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide4" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
              <div id="slide4" className="carousel-item relative w-full">
                <img
                  src="https://placeimg.com/800/200/arch"
                  className="w-full"
                />
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href="#slide3" className="btn btn-circle">
                    ❮
                  </a>
                  <a href="#slide1" className="btn btn-circle">
                    ❯
                  </a>
                </div>
              </div>
            </div>
            <label
              htmlFor="my-drawer-4"
              className="drawer-button btn btn-outline btn-info"
            >
              Open Watchlist
            </label>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
            {watchlist.map((ele) => (
              <li>
                <Link to="/search" key={ele.slug}>
                  {ele.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
