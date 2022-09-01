import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

function Watchlist({ watchlist, removeWatchlist, fetchSearch }) {
  let navigate = useNavigate();
  return (
    <>
      <div className="bg-gray-750 h-screen">
        <div className="flex flex-col gap-5 py-16 font-poppins text-white">
          <h1 className="text-center font-bold text-3xl pb-10">WATCHLIST</h1>
          {watchlist?.map((ele) => (
            <div className="flex justify-around items-center mx-10">
              <div
                onClick={() => {
                  fetchSearch(ele?.slug);
                  navigate("../stats");
                }}
                key={ele?.created_date}
                className="grid grid-cols-4 border-solid border-2 border-black rounded-lg ml-20 mr-10 px-10 py-2 w-full font-poppins text-center items-center bg-white bg-opacity-5 transition ease-in-out hover:scale-105 cursor-pointer "
              >
                <div className="flex items-center justify-between gap-5">
                  <img
                    className=" object-cover w-auto h-24 rounded-full border-solid border-2 border-slate-400 bg-white"
                    src={ele?.image_url}
                  />
                  <p>{ele?.name}</p>
                </div>
                <div>
                  <p className=" ">
                    Floor Price:
                    {Math.round(ele?.stats?.floor_price * 100) !== 0
                      ? Math.round(ele?.stats?.floor_price * 100) / 100
                      : "-"}
                  </p>
                </div>
                <div>
                  <p>
                    Total Volume:
                    {Math.round(ele?.stats?.total_volume / 100) / 10}K
                  </p>
                </div>
                <div>
                  <p>
                    Market-Cap:
                    {Math.round(ele?.stats?.market_cap * 100) / 100}K
                  </p>
                </div>
              </div>
              <div>
                <button
                  value={ele?.name}
                  onClick={removeWatchlist}
                  className="p-1 border-solid border-2 border-black rounded hover:bg-slate-600 mr-20"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Watchlist;
