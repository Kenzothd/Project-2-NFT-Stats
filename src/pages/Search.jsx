import { useState, useEffect } from "react";

function Search({ searchInput }) {
  const [searchData, setSearchData] = useState();

  const fetchSearch = (searchInput) => {
    console.log(searchData);
    const options = { method: "GET", headers: { Accept: "application/json" } };

    fetch(`https://api.opensea.io/api/v1/collection/${searchInput}`, options)
      ?.then((response) => response.json())
      ?.then((data) => {
        console.log(data);
        setSearchData(data.collection);
      })
      ?.catch((err) => console.error(err));
  };

  useEffect(() => fetchSearch(searchInput), [searchInput]);

  console.log(searchData);
  return (
    <>
      <div className="px-40 py-20">
        <img className="w-48 h-48" src={searchData?.image_url} />
        {/* <p>{searchData.name}</p> */}
      </div>
    </>
  );
}

export default Search;
