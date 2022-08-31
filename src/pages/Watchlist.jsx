import { useState, useContext } from "react";

function Watchlist({ watchlist, removeWatchlist }) {
  return (
    <>
      <div className="flex flex-col gap-5 py-5 font-poppins">
        <h1 className="text-center font-bold">WATCHLIST</h1>
        {watchlist?.map((ele) => (
          <div
            key={ele?.created_date}
            className="flex justify-between items-center mx-20 px-10 py-5 border-solid border-2 border-white rounded-lg"
          >
            <p className="flex items-center justify-between">
              <img
                className=" object-cover w-auto h-24 rounded-full border-solid border-2 border-slate-400 bg-white"
                src={ele?.image_url}
              />
              {ele?.name}
            </p>
            <p className="">Floor Price: {ele?.stats?.floor_price}</p>
            <button
              value={ele?.name}
              onClick={removeWatchlist}
              className="p-1 border-solid border-2 border-black rounded "
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
