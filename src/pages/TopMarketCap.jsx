import { useEffect, useState } from "react";
import TMCTreemap from "../components/Treemap";
import Sidebar from "../components/Sidebar";

function TopMarketCap() {
  const [top20Collections, setTop20Collections] = useState([]);

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
      "https://api.modulenft.xyz/api/v2/eth/nft/ranks?orderBy=volume&timeRange=one_day_volume&count=50&offset=0&marketplace=Opensea",
      options
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
        const topCollections = data?.data?.map((ele) => ele?.slug);
        ////////*Fetch Top Collections STATS*///////
        const options = {
          method: "GET",
          headers: { Accept: "application/json" },
        };
        console.log("slug name", topCollections);
        let requests = topCollections.map((ele) =>
          fetch(`https://api.opensea.io/api/v1/collection/${ele}/`, options)
        );

        Promise.all(requests)
          .then((responses) => Promise.all(responses.map((r) => r.json())))
          .then((datas) => {
            const arrayVolumeSort = datas.sort(
              (a, b) =>
                b?.collection?.stats?.one_day_volume -
                a?.collection?.stats?.one_day_volume
            );
            const collectionsStats = arrayVolumeSort?.map(
              (ele) => ele?.collection
            );
            setTop20Collections(collectionsStats?.slice(0, 20));
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }, []);

  console.log("top", top20Collections);

  return (
    <>
      <div className="bg-gray-800 h-screen">
        <div className="bg-gray-800 mx-20 p-12 h-5/6 text-white ">
          <h1 className=" mb-5 ">
            <span className="text-3xl font-bold">Top 20 Market Cap</span>
            <span className="text-md ">(Floor price * Total supply)</span>
          </h1>

          {top20Collections[0] ? (
            <TMCTreemap top100Collections={top20Collections} />
          ) : (
            <div>
              <progress className="bg-white progress w-56"></progress>
              loading...
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TopMarketCap;
