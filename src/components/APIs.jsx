import { useState, useEffect } from "react";

function APIs() {
  const [liveStats, setLiveStats] = useState();

  //   const [contract, setContract] = useState({});

  const handleClick = () => {
    //phase 1 getting live floor price of OS collection
    const options = { method: "GET", headers: { Accept: "application/json" } };
    // useEffect(() => {
    fetch(
      "https://api.opensea.io/api/v1/collection/doodles-official/stats",
      options
    )
      .then((response) => response.json())
      .then((data) => setLiveStats(data))
      .catch((err) => console.error(err));
    // }, []);
  };
  console.log(liveStats);

  ///////////////////////
  //phase 2 when getting input of contract address and converting to collection name
  //Api key needed, 500/month

  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": "c74d2ed0b7msh849b0e2d8bb5a04p1ab3a3jsn7ef52ae2d1ca",
  //       "X-RapidAPI-Host": "opensea-data-query.p.rapidapi.com",
  //     },
  //   };

  //   useEffect(() => {
  //     fetch(
  //       "https://opensea-data-query.p.rapidapi.com/api/v1/asset_contract/0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  //       options
  //     )
  //       .then((response) => response.json())
  //       .then((data) => setContract(data))
  //       .catch((err) => console.error(err));
  //     console.log(contract);
  //   }, []);
  ///////////////////////
  return (
    <>
      <button onClick={handleClick}>Click</button>
      <h1>{liveStats?.stats?.floor_price}</h1>
      {/* <h1>{contract?.collection?.slug}</h1> */}
    </>
  );
}

export default APIs;
