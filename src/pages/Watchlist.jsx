import { useState, useContext } from "react";

function Watchlist({ watchlist, setWatchlist }) {
  const removeWatchlist = (event) => {
    const newArray = watchlist.filter((ele) => ele.name !== event.target.value);
    setWatchlist([...newArray]);
  };

  console.log(watchlist);
  return (
    <>
      <div className="flex flex-col gap-5 py-5 font-poppins">
        <p className="text-center font-bold">WATCHLIST</p>
        {watchlist.map((ele) => (
          <div
            key={ele.created_date}
            className="flex justify-between items-center mx-20 px-10 py-5 border-solid border-2 border-white rounded-lg"
          >
            <img
              className=" object-cover w-auto h-24 rounded-full border-solid border-2 border-slate-50 bg-white"
              src={ele?.image_url}
            />
            <p>{ele?.name}</p>
            <p>Floor Price: {ele?.stats?.floor_price}</p>
            <button
              value={ele.name}
              onClick={removeWatchlist}
              className="p-1 border-solid border-2 border-white rounded "
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Watchlist;
