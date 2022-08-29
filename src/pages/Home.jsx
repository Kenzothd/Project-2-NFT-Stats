import { useEffect, useState } from "react";

function Home() {
  /////////////////////////*State*/////////////////////////
  const [topCollectionStats, setTopCollectionStats] = useState([]);
  const [volume, setVolume] = useState("one_day_volume");
  const [sort, setSort] = useState("up");

  const round2DP = (num) => Math.round(num * 100) / 100;

  const Tbody = ({ volume }) => {
    return topCollectionStats?.map((ele, i) => (
      <tr key={ele?.name}>
        <td>{i + 1}</td>
        <td className="flex items-center gap-5 pl-10">
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
            const x = datas.map((ele) => ele.collection);
            setTopCollectionStats(x);
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

      <div className="px-12">
        <table className="w-full text-center ">
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
    </>
  );
}

export default Home;
